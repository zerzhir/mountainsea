<template>
  <div class="row">
    <div class="container">
      <div class="buymore">
        <buymore-item title="立即购买" />
        <buymore-item title="生成礼品链接" :is-linkdrop="true" />
        <div class="buymore-item">
          <div class="h2" @click="toggleModal">发送NFT</div>
          <img src="../../assets/j1.png" alt="" />
        </div>
      </div>
      <modal-send ref="send"/>
    </div>
  </div>
</template>
<script>
import BuymoreItem from './BuymoreItem'
import ModalSend from './ModalSend'
export default {
  components: {
    BuymoreItem,
    ModalSend
  },
  data () {
    return {
      showSend: false,
      form: {
        nft: undefined,
        account: ''
      },
      rules: {
        nft: [
          {
            required: true,
            message: '请输入发送的NFT Token ID'
          }
        ],
        account: [
          {
            required: true,
            message: '请输入接收账户'
          }
        ]
      }
    }
  },
  computed: {
    app () {
      return this.$store.state.near.app || {}
    },
    nftsList () {
      return this.app.misfitsArray
    }
  },
  methods: {
    toggleModal () {
      this.$refs.send.toggleModal()
    }
  }
}
</script>
<style lang="less">
.buymore {
  display: flex;
  justify-content: space-between;
  margin: 43px 0;
  &-item {
    width: 256px;
    position: relative;
    & > img {
      margin-top: 18px;
      width: 100%;
    }
    .h2 {
      width: 100%;
      height: 56px;
      line-height: 56px;
      text-align: center;
      font-size: 22px;
      color: #fff;
      background: #d49101;
      cursor: pointer;
    }
    span {
      width: 100%;
      position: absolute;
      display: inline-block;
      font-size: 14px;
      color: #3f4246;
      word-break: keep-all;
      padding: 3px 0 0 10px;
    }
    .one,
    .ten {
      border-left: 3px dashed #c4c4c4;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-top: 58px;
    }
    .round {
      width: 78px;
      height: 78px;
      text-align: center;
      line-height: 78px;
      font-size: 20px;
      font-weight: 800;
      color: #fff;
      background: #54c4f6;
      border-radius: 100px;
      margin-left: -39px;

      cursor: pointer;
      &:hover,
      &.active {
        transition: box-shadow 0.5s ease-in-out;
        box-shadow: 0 0 20px #d49101;
      }
    }
    .ten {
      .round {
        background: #281a6f;
      }
    }
    .num {
      font-weight: 600;
      font-size: 48px;
      text-align: center;

      color: #3f4246;
    }
    .line {
      width: 42px;
      height: 0;
      border-bottom: 3px dashed #c4c4c4;
    }
  }
}
</style>
<style lang="less">
.mobile{
  .buymore {
    flex-wrap: wrap;
    justify-content: space-around;
    &-item{
      width: 100%;
      height: auto;
      margin-bottom: 50px;
      padding-left: 40px;
      padding-right: 10px;
    }
  }
}
</style>
