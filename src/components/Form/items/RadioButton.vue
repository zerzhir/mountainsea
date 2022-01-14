<template>
  <a-form-item :label="label" v-bind="cols">
    <a-radio-group v-bind="options" v-decorator="[name, { ...decorator }]" v-on="event">
      <a-radio-button v-for="item in enumData" :key="item[fields.value]" :value="item[fields.value]">{{
        item[fields.text]
      }}</a-radio-button>
    </a-radio-group>
    <p class="desc" v-html="extra.desc"></p>
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
    return {}
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
    fields () {
      return this.$lodash.merge(
        {
          value: 'value',
          text: 'text'
        },
        this.extra.fields
      )
    }
  },
  methods: {},
  mounted () {
    this.$nextTick(() => {
      this.$emit('complete', this.name)
    })
  }
}
</script>
<style lang="less" scoped>
.ant-radio-button-wrapper {
  margin-right: 10px;
  border-radius: 4px !important;
}
.ant-radio-button-wrapper-checked {
  box-shadow: 0px 4px 19px 0px rgba(55, 94, 246, 0.59) !important;
}
.ant-radio-button-wrapper-disabled.ant-radio-button-wrapper-checked {
  background-color: #1890ff;
  border-color: #1890ff;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child {
  box-shadow: 0px 4px 19px 0px rgba(55, 94, 246, 0.59) !important;
}
.desc {
  margin-top: 8px;
  margin-bottom: 0;
  line-height: 20px;
  color: #999999;
  font-size: 13px;
  a {
    color: #6b77ff;
  }
}
</style>
