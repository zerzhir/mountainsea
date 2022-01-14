<template>
  <div class="input-number">
    <a-button @click="handleDown" :disabled="currentValue <= min" class="ant-btn-minus">-</a-button>
    <a-input-number v-model="currentValue" :min="min" :max="max" :step="step" :style="styles"> </a-input-number>
    <a-button @click="handleUp" :disabled="currentValue >= max" class="ant-btn-plus">+</a-button>
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    styles: {
      type: Object,
      default () {
        return {
            width: '60px'
        }
      }
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    currentValue: function (val) {
      this.$emit('change', val)
    },
    value (val) {
      this.updateValue(val)
    }
  },
  methods: {
    isValueNumber (value) {
      return /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/.test(value + '')
    },
    handleDown () {
      if (this.currentValue <= this.min) return
      this.currentValue -= this.step
    },
    handleUp () {
      if (this.currentValue >= this.max) return
      this.currentValue += this.step
    },
    updateValue (val) {
      if (val > this.max) val = this.max
      if (val < this.min) val = this.min
      this.currentValue = Number(val)
    }
  },
  mounted () {
    this.updateValue(this.value)
  }
}
</script>

<style lang="less">
.input-number {
  width: auto;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 4px;
  .ant-input-number-handler-wrap {
    display: none;
  }
  .ant-input-number {
    border: 0;

    .ant-input-number-input {
      text-align: center;
    }
  }
  .ant-btn-minus {
    border: 0;
    border-right: 1px solid #d9d9d9;
  }

  .ant-btn-plus {
    border: 0;
    border-left: 1px solid #d9d9d9;
  }
}
</style>
