<template>
  <a-form-item :label="label" v-bind="cols">
    <a-date-picker
      v-bind="options"
      style="width:100%"
      v-decorator="[name, { ...decorator }]"
      v-on="event"
      v-if="mode === 'date'"
    />
    <a-range-picker
      v-bind="options"
      style="width:100%"
      v-decorator="[name, { ...decorator }]"
      v-on="event"
      v-if="mode === 'range'"
    />
    <a-month-picker
      v-bind="options"
      style="width:100%"
      v-decorator="[name, { ...decorator }]"
      v-on="event"
      v-if="mode === 'month'"
    />
    <a-week-picker
      v-bind="options"
      style="width:100%"
      v-decorator="[name, { ...decorator }]"
      v-on="event"
      v-if="mode === 'week'"
    />
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
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    mode () {
      if (this.$lodash.has(this.extra, 'mode')) {
        return this.extra.mode
      }
      return 'date'
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
