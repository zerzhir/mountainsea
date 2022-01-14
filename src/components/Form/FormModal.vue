<template>
  <a-modal :title="options.title" :width="width" @cancel="onFormClose" :visible="show" :footer="null">
    <div :style="{ paddingTop: options.title ? 'auto' : '25px' }">
      <z-form v-bind="options" :values="values" @submit="handleSubmit" ref="form" />
    </div>
  </a-modal>
</template>
<script>
import ZForm from '@/components/Form/Form'
export default {
  components: {
    ZForm
  },
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    values: {
      type: Object,
      default () {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    width () {
      return this.options.width || 400
    }
  },
  watch: {},
  methods: {
    handleSubmit (values) {
      this.$emit('submit', values)
    },
    onFormClose () {
      this.$refs.form.handleReset()
      this.$emit('close', {})
    },
    fetchValues (name) {
      return this.$refs.form.fetchValues(name)
    }
  }
}
</script>
<style lang="less"></style>
