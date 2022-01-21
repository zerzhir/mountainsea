<template>
  <div>
    <template v-if="!linksList.length">
      <div class="row row-linkdrop">
        <div class="container">
          <div class="linkdrop-banner">
            <img src="../../assets/linkdrop.png" alt="" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="container">
          <div class="linkdrop">
            <div class="h3">You don't have a Linkdrop link yet</div>
            <div class="btn">Click<span>"Generate Gift Link"</span>to buy</div>
            <div class="clearfix"></div>
            <share-links />
          </div>
        </div>
      </div>
    </template>
    <share-gifts :links="linksList" v-else />
  </div>
</template>
<script>
import ShareLinks from './components/ShareLinks'
import ShareGifts from './components/ShareGifts'
export default {
  components: {
    ShareLinks,
    ShareGifts
  },
  data () {
    return {}
  },
  computed: {
    app () {
      return this.$store.state.near.app || {}
    },
    linksList () {
      return this.app.linkDropArray
    }
  },
  created () {
    if (!localStorage.undefined_wallet_auth_key) {
      this.$message.warning('请先连接钱包')
      this.$router.push('/')
    }
  },
  methods: {
    handleSave () {}
  }
}
</script>
<style lang="less">
.row-linkdrop {
  background: #54c4f6 url(../../assets/linkdrop_bg.png) no-repeat top center;
}
.linkdrop-banner {
  display: flex;
  justify-content: center;
  height: 418px;
  align-items: center;
  opacity: 1;
}
.linkdrop {
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .h3 {
    font-size: 38px;
    color: #d49101;
    line-height: 40px;
    width: 100%;
    padding: 29px 0;
  }
  .btn {
    width: 348px;
    height: 56px;

    border: 2px solid #d49101;
    text-align: center;
    font-size: 20px;
    line-height: 56px;
    color: #3f4246;
    span {
      color: #d49101;
    }
  }
}
</style>
<style lang="less">
.mobile {
  .row-linkdrop {
    background: #54c4f6 url(../../assets/linkdrop_bg_mb.png) no-repeat top center;
    background-size: 100% auto;
  }
  .linkdrop-banner{
    height: auto;
    img{
      width: 160px;
      margin: 18px 0;
    }

  }
  .linkdrop{
    .h3{
      font-size: 20px;
      padding: 15px 0;
    }
    .btn{
      font-size: 12px;
      width: 210px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
