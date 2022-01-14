<template>
  <a-form-item :label="label" v-bind="cols">
    <!-- <div :id="'select-'+name" style="line-height: 43px;height:40px;"> -->
    <div :id="'select-' + name">
      <!-- :getPopupContainer="()=>document.getElementById('select-'+name)" -->
      <a-select
        :allowClear="true"
        :options="enumData"
        v-bind="options"
        v-decorator="[name, { ...decorator }]"
        v-on="event"
      >
        <a-icon slot="suffixIcon" type="search" :style="{ fontSize: '14px' }" v-if="options.showSearch" />
      </a-select>
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
      document: document
    }
  },
  computed: {
    enumData () {
      let data = []
      const enumData = []
      if (this.$lodash.isString(this.extra.data)) {
        const enumItem = this.$store.state.base.enums[this.extra.data]
        this.$lodash.forIn(enumItem, (value, key) => {
          data.push({
            text: value,
            value: this.$lodash.isNumber(Number(key)) ? Number(key) : key
          })
        })
        console.log(data, enumItem)
      } else {
        data = this.extra.data || []
      }
      data.forEach(item => {
        enumData.push({
          label: item[this.fields.text],
          value: item[this.fields.value]
        })
      })
      console.log(data, enumData)
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
<style></style>
