<template>
  <a-form-item :label="label">
    <a-tree
      v-bind="options"
      v-decorator="[name, { ...decorator, valuePropName: 'checkedKeys' }]"
      v-on="event"
      @check="onCheck"
    >
    </a-tree>
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
  methods: {
    onCheck (checkedKeys, info) {
      const formItem = {}
      formItem[this.name] = {
        checked: checkedKeys,
        halfChecked: info.halfCheckedKeys
      }
      this.$emit('update', {
        name: this.name,
        formItem: formItem
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$emit('complete', this.name)
    })
  }
}
</script>
<style></style>
