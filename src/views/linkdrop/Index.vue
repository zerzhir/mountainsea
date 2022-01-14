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
            <div class="h3">你还没有Linkdrop链接</div>
            <div class="btn">点击<span>“生成礼品链接”</span>购买</div>
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
    width: 283px;
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
