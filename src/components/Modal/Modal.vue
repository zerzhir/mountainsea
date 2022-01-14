<template>
  <a-modal v-model="showModal" :footer="null" :width="width" @cancel="onCancel">
    <div class="modal">
      <div class="title" v-if="title">
        {{ title }} <span>{{ subTitle }}</span>
      </div>
      <slot></slot>
      <div class="btns" :style="cancel ? '' : 'justify-content: center;'">
        <slot name="btns">
          <div class="btn" @click="handleConfirm">确定</div>
          <div class="btn btn-cancel" v-if="cancel" @click="handleCancel">取消</div>
        </slot>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 580
    },
    cancel: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    toggleModal () {
      this.showModal = !this.showModal
    },
    onCancel () {
      this.$emit('cancel')
    },
    handleConfirm () {
      this.$emit('confirm')
    },
    handleCancel () {
      this.toggleModal()
    }
  },
  mounted () {}
}
</script>

<style lang="less">
.modal {
  background: #141414;
  border-top: 2px solid #efb437;
  box-shadow: 0 0 1px #ffda89;
  padding: 20px 40px 40px;
  .title {
    margin-bottom: 20px;
    font-size: 26px;
    color: #efb437;
    span {
      font-size: 16px;
      color: #999;
    }
  }
  .btns {
    display: flex;
    justify-content: center;
    .btn {
      width: 47.6%;
      max-width: 238px;
      height: 45px;
      margin: 40px 20px 0;
      line-height: 45px;
      text-align: center;
      font-size: 16px;
      color: #000;
      background: #efb437;
      cursor: pointer;
      &-cancel {
        color: #999;
        background: #333;
      }
    }
  }
}
.ant-modal-close {
  color: #999 !important;
}
</style>
