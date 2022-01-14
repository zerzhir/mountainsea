<template>
  <a-form-item :label="label" v-bind="cols">
    <div v-decorator="[name, { ...decorator }]" style="margin-top:6px">
      <a-radio-group v-bind="options" v-model="radioValue" v-on="event" style="float:left" @change="onRadioChange">
        <a-radio-button v-for="item in radioEnum" :key="item[fields.value]" :value="item[fields.value]">{{
          item[fields.text]
        }}</a-radio-button>
      </a-radio-group>
      <a-select
        v-bind="extra.options"
        :allowClear="true"
        :options="selectEnum"
        v-model="selectValue"
        v-on="extra.event"
        @change="onSelectChange"
      ></a-select>
    </div>
  </a-form-item>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    component: {
      type: String,
      default: 'input'
    },
    hidden: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    cols: {
      // 值会覆盖form的cols设置
      type: Object,
      default () {
        return {}
      }
    },
    // value: {
    //   type: Number
    // },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    decorator: {
      type: Object,
      default () {
        return {}
      }
    },
    event: {
      type: Object,
      default () {
        return {}
      }
    },
    extra: {
      type: Object,
      default () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
      radioValue: undefined,
      selectValue: undefined
    }
  },
  computed: {
    enumData () {
      let data = []
      if (this.$lodash.isString(this.extra.data)) {
        data = this.$store.state.base.enums[this.extra.data]
      } else {
        data = this.extra.data || []
      }
      return data
    },
    radioEnum () {
      return this.enumData.slice(0, this.extra.radioNum || 3)
    },
    selectEnum () {
      const enumData = []
      const data = this.enumData.slice(this.extra.radioNum || 3)
      data.forEach(item => {
        enumData.push({
          label: item[this.fields.text],
          value: item[this.fields.value]
        })
      })
      return enumData
    },
    fields () {
      return this.$lodash.merge(
        {
          value: 'value',
          text: 'text'
        },
        this.extra.fields
      )
    },
    value () {
      return parseInt(this.extra.value) || undefined
    }
  },
  watch: {
    value (val) {
      const idx = this.$lodash.findIndex(this.enumData, { value: val })
      if (idx < (this.extra.radioNum || 3)) {
        this.radioValue = parseInt(val)
        this.selectValue = undefined
      } else {
        this.selectValue = parseInt(val)
        this.radioValue = undefined
      }
    }
  },
  methods: {
    onItemChange (val) {
      const formItem = {}
      formItem[this.name] = parseInt(this.radioValue || this.selectValue)
      console.log(formItem[this.name], 1111)
      this.$emit('update', {
        name: this.name,
        formItem: formItem
      })

      // this.$emit('change', this.radioValue || this.selectValue)
    },
    onSelectChange (val) {
      this.radioValue = undefined
      this.onItemChange()
    },
    onRadioChange (val) {
      this.selectValue = undefined
      this.onItemChange()
    }
  },
  mounted () {
    console.log(this)
    const val = this.decorator.initialValue
    const idx = this.$lodash.findIndex(this.enumData, { value: val })
    if (idx < (this.extra.radioNum || 3)) {
      this.radioValue = val
    } else {
      this.selectValue = val
    }
    this.$nextTick(() => {
      this.$emit('complete', this.name)
    })
  }
}
</script>
<style lang="less" scoped>
.ant-radio-button-wrapper {
  min-width: 80px;
  text-align: center;
}
.ant-radio-button-wrapper-disabled.ant-radio-button-wrapper-checked {
  background-color: #1890ff;
  border-color: #1890ff;
}
form .ant-select,
form .ant-cascader-picker {
  width: auto;
  min-width: 150px;
  margin-left: 20px;
  float: left;
}
</style>
