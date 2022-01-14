<template>
  <div class="row">
    <div class="container">
      <div class="banner">
        <div class="h1">
          卷卷元宇宙•山海经系列
        </div>
        <p>
          欢迎来到卷卷与中国古籍山海经灵兽的奇缘世界，开启你的收藏之旅吧！ <br />
          <span>发行日期2022年1月15日</span>
        </p>
        <div class="btn" @click="handleBuy">{{ wallet.signedIn ? '购买一个' : '连接钱包' }}</div>
        <div class="total">
          <div class="total-item">
            <b>24</b> <br />
            卷卷
          </div>
          <div class="total-item">
            <b>1.5K</b><br />
            白虎
          </div>
          <div class="total-item">
            <b>1.5K</b><br />
            青龙
          </div>
          <div class="total-item">
            <b>1.5K</b><br />
            朱雀
          </div>
          <div class="total-item">
            <b>1.5K</b><br />
            玄武
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    wallet () {
      return this.$store.state.near.wallet || {}
    }
  },
  methods: {
    handleBuy () {
      if (this.wallet.signedIn) {
        this.$router.push('/nfts')
        return
      }
      this.wallet.signIn()
    }
  }
}
</script>
<style lang="less">
.banner {
  background: url(../../../assets/banner.png) no-repeat top center;
  width: 100%;
  height: 571px;
  color: #fff;
  padding: 84px 45px;
  position: relative;
  .h1 {
    font-weight: bold;
    font-size: 58px;
    line-height: 67px;
    margin-bottom: 25px;
  }
  p {
    width: 484px;
    font-size: 24px;
    line-height: 36px;
    margin-bottom: 0;
    span {
      display: inline-block;
      padding: 30px 0;
    }
  }
  .btn {
    width: 214px;
    height: 54px;
    color: #000;
    font-weight: bold;
    font-size: 16px;
    line-height: 54px;
    text-align: center;
    letter-spacing: 0.01em;
    color: #d49101;
    background: #ffffff;
  }
  .total {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    width: 530px;
    &-item {
      font-size: 14px;
      line-height: 16px;
      color: #3f4246;
      text-align: center;
      line-height: 30px;

      b {
        font-weight: 600;
        font-size: 31px;
        line-height: 36px;
        color: #d49101;
      }
    }
  }
}
</style>
