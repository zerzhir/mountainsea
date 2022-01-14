<template>
  <div class="ip-vlan">
    <a-input v-model="currentValue[0]" :disabled="firstDisable" style="width:60px" /> •
    <a-input v-model="currentValue[1]" :disabled="secondDisable" style="width:60px" /> •
    <a-input v-model="currentValue[2]" :disabled="thirdDisable" style="width:60px" /> •
    <a-input v-model="currentValue[3]" :disabled="fourthDisable" style="width:60px" /> /
    <a-select v-model="currentValue[4]" style="width:60px">
      <a-select-option :value="item" v-for="(item, index) in vlans" :key="index">
        {{ item }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  name: 'IpVlan',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    vlanMin: {
      type: Number,
      default: 8
    },
    vlanMax: {
      type: Number,
      default: 24
    },
    isChild: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  computed: {
    vlans () {
      const vlans = []
      for (let i = this.vlanMin; i <= this.vlanMax; i++) {
        vlans.push(i)
      }
      return vlans
    },
    firstDisable () {
      return this.isChild
    },
    secondDisable () {
      if (this.currentValue[4] <= 8) {
        return true
      }
      return false
    },
    thirdDisable () {
      if (this.currentValue[4] <= 16) {
        return true
      }
      return false
    },
    fourthDisable () {
      if (this.currentValue[4] <= 24) {
        return true
      }
      return false
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
    updateValue (val) {
      this.currentValue = val
    }
  },
  mounted () {
    this.updateValue(this.value)
  }
}
</script>

<style lang="less" scoped>
.ip-vlan {
  display: inline-block;
}
.ant-input{
  text-align: center;
}
</style>
