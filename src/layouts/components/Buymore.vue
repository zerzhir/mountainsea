<template>
  <a-affix :offset-bottom="0" v-if="isMobile">
    <div class="row">
      <div class="container">
        <div class="buymore">
          <buymore-item title="Buy more" />
          <buymore-item title="Generate gift links" :is-linkdrop="true" />
          <div class="buymore-item">
            <div class="h2" @click="toggleModal">Send NFT</div>
            <img src="../../assets/j1.png" alt="" />
          </div>
        </div>
        <modal-send ref="send"/>
      </div>
    </div>
  </a-affix>
  <div class="row" v-else>
    <div class="container">
      <div class="buymore">
        <buymore-item title="Buy more" />
        <buymore-item title="Generate gift links" :is-linkdrop="true" />
        <div class="buymore-item">
          <div class="h2" @click="toggleModal">Send NFT</div>
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
import { deviceMixin } from '@/store/device-mixin'
export default {
  mixins: [deviceMixin],
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
    background: #e5e5e5;
    padding: 10px 0;
    margin: 15px 0;
    &-item{
      width: 46%;
      height: auto;
      margin-bottom: 50px;
      padding-left: 20px;
      padding-right: 10px;
      margin-left: 10px;
      &:last-child{
        width: 100%;
        img{
          display: none;
        }
      }
      .h2{
        width: auto;
        margin-left: -20px;
        margin-right: 0;
        height: 38px;
        line-height: 38px;
        font-size: 14px;

      }
      span{
        font-size: 9px;
        letter-spacing: 0;

      }
      .round{
        width: 45px;
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        margin-left: -25px;
      }
      .one,.ten{
        padding-top: 40px;
      }
      .num{
        font-size: 24px;
      }
    }
  }
}
</style>
