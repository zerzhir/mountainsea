<template>
  <a-form-item :label="label" v-bind="cols">
    <a-input-password v-bind="options" v-decorator="[name, { ...decorator }]" v-on="event">
      <template #[position] v-if="extra.icon">
        <a-icon :type="extra.icon.type" />
      </template>
    </a-input-password>
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
    position () {
      return this.extra && this.extra.icon && this.extra.icon.position
    }
  },
  methods: {},
  mounted () {}
}
</script>
<style></style>
