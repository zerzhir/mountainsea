<template>
  <a-form-item :label="label" v-bind="cols" class="form-tag">
    <div v-decorator="[name, { ...decorator }]">
      <template v-for="tag in tags">
        <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
          <a-tag :key="tag" :closable="true" @close="() => handleClose(tag)">{{ `${tag.slice(0, 20)}...` }}</a-tag>
        </a-tooltip>
        <a-tag v-else :key="tag" :closable="true" @close="() => handleClose(tag)">{{ tag }}</a-tag>
      </template>
      <a-input
        v-if="showInput"
        ref="input"
        type="text"
        :style="{ width: '100px' }"
        :value="tagTemp"
        @change="handleChange"
        @blur="handleConfirm"
        @keyup.enter="handleConfirm"
      />
      <a-tag v-else @click="handleShow" style="background:#6884F7;color:#ffffff;">
        <a-icon type="plus-circle" style="padding-right:5px;" />添加
      </a-tag>
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
        return {}
      }
    }
  },
  data () {
    return {
      tags: [],
      showInput: false,
      tagTemp: ''
    }
  },
  methods: {
    onTagsChange () {
      const formItem = {}
      formItem[this.name] = this.tags
      this.$emit('update', {
        name: this.name,
        formItem: formItem
      })
    },
    handleClose (removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      this.tags = tags
      this.onTagsChange()
    },
    handleShow () {
      this.showInput = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },

    handleChange (e) {
      this.tagTemp = e.target.value
    },

    handleConfirm () {
      const tagTemp = this.tagTemp
      let tags = this.tags
      if (tagTemp && tags.indexOf(tagTemp) === -1) {
        tags = [...tags, tagTemp]
      }
      Object.assign(this, {
        tags,
        showInput: false,
        tagTemp: ''
      })
      this.onTagsChange()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$emit('complete', this.name)
    })
  }
}
</script>
<style lang="less">
.form-tag {
  .ant-tag {
    padding: 0 15px;
    font-size: 13px;
    color: #666666;
    line-height: 30px;
    position: relative;
    display: inline-block;
    .anticon-close {
      position: absolute;
      right: -8px;
      top: -8px;
      width: 16px;
      height: 16px;
      color: #ffffff;
      font-size: 10px;
      text-align: center;
      line-height: 16px;
      background: #4d63d1;
      border-radius: 8px;
    }
  }
}
</style>
