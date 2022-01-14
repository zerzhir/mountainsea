<template>
  <a-form-item :label="label" v-bind="cols" style="margin-top:20px">
    <a-col :span="16" class="slider-number">
      <a-slider v-bind="options" v-decorator="[name, { ...decorator }]" v-on="event" />
    </a-col>
    <a-col :span="7" :offset="1">
      <a-input-number v-bind="options" v-decorator="[name, { ...decorator }]" v-on="event" />
      <span>个</span>
    </a-col>
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
  methods: {},
  mounted () {
    this.$nextTick(() => {
      this.$emit('complete', this.name)
    })
  }
}
</script>
<style lang="less">
.slider-number {
  .ant-slider {
    height: 30px;
    margin-top: 4px;
    margin-left: 2px;
    margin-right: 0;
    &-rail {
      height: 30px;
      background: #ffffff;
      border: 1px solid #eeeeee;
    }
    &-track {
      height: 30px;
      background-color: #b4c2fb;
    }
    &-step {
      height: 30px;
    }
    &-dot {
      width: 1px;
      height: 30px;
      top: 0;
      border: 0;
      border-radius: 0;
      background: #eeeeee;
      &:first-child,
      &:last-child {
        width: 0;
      }
    }
    &-handle {
      width: 12px;
      height: 34px;
      margin-top: -2px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(237, 237, 237, 1) 100%);
      border-radius: 2px;
      border: 1px solid rgba(230, 230, 230, 1);
      &:focus {
        box-shadow: 0 0 0 1px rgba(104, 132, 247, 0.2);
      }
    }
    &-mark {
      top: -20px;
    }
  }
}
</style>
