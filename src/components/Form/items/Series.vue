<template>
  <a-form-item :label="label" v-bind="cols">
    <a-input v-decorator="[name, { ...decorator }]" hidden />
    <ul class="series">
      <li
        v-for="(item, index) in extra.data"
        :key="index"
        :class="{ active: item.id == value }"
        @click="handleCheck(item)"
      >
        <div class="arrow">
          <a-icon type="check"></a-icon>
        </div>
        <div class="title">
          {{ item.name }}
        </div>
        <p>
          <span v-for="(itm, idx) in item.items" :key="idx">
            <b-icon :type="itm.icon" :class="itm.icon" />{{ itm.name }} <em class="right">{{ itm.value }}</em>
          </span>
        </p>
      </li>
    </ul>
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
        return {}
      }
    }
  },
  data () {
    return {
      value: '1'
    }
  },
  computed: {},
  methods: {
    onChange () {
      const formItem = {}
      formItem[this.name] = this.value
      this.$emit('update', {
        name: this.name,
        formItem: formItem
      })
    },
    handleCheck (item) {
      this.value = item.id
      this.onChange()
    }
  },
  mounted () {
    console.log(this.value, this.decorator.initialValue)
    this.value = this.decorator.initialValue
    this.$nextTick(() => {
      this.$emit('complete', this.name)
    })
  }
}
</script>
<style lang="less" scoped>
.series {
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 0 -29px;
  li {
    padding: 0 30px 20px;
    min-width: 248px;
    margin: 0 29px;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
    cursor: pointer;
    .title {
      margin-bottom: 10px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #e6e6e6;
    }
    p {
      span {
        display: inline-block;
        width: 100%;
      }
      i {
        padding-right: 10px;
      }
      em {
        float: right;
        font-style: normal;
      }
    }
    .arrow {
      display: none;
    }
    &.active {
      position: relative;
      box-shadow: 0px 15px 30px 0px rgba(247, 181, 0, 0.26);
      border: 2px solid #ffc015;
      .arrow {
        position: absolute;
        display: block;
        right: 0;
        top: 0;
        width: 0;
        height: 0;
        border-right: 87px solid;
        border-bottom: 64px solid;
        border-left: 0;
        border-top: 0;
        border-color: #ffc015 #ffc015 transparent transparent;
        .anticon-check {
          position: absolute;
          color: #ffffff;
          right: -80px;
          top: 10px;
          font-size: 20px;
        }
      }
    }
  }
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
