<template>
  <a-form-item :label="label" v-bind="cols">
    <a-radio-group v-bind="options" v-decorator="[name, { ...decorator }]" v-on="event">
      <a-radio-button v-for="item in extra.data" :key="item[fields.value]" :value="item[fields.value]">
        {{ item[fields.text] }}
      </a-radio-button>
    </a-radio-group>
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
  mounted () {}
}
</script>
<style></style>
