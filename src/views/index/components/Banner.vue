<template>
  <div class="row">
    <div class="container">
      <div class="banner">
        <div class="h1">
          卷卷元宇宙•山海经系列
        </div>
        <p>
          欢迎来到卷卷与中国古籍山海经灵兽的奇缘世界，开启你的收藏之旅吧！ <br />
          <span>发行日期2022年1月22日</span>
        </p>
        <!-- <div class="btn" @click="handleBuy">{{ wallet.signedIn ? '购买一个' : '连接钱包' }}</div> -->
        <a-popover>
          <template slot="content">
            <a
              class="btn btn-account"
              href="https://wj.qq.com/s2/9609897/8982"
              target="_blank"
            ><a-button type="primary">提交账户信息</a-button></a
            >
            <a
              class="btn btn-discord"
              href="https://discord.gg/cMeSWKQ66p"
              target="_blank"
            ><a-button type="primary">进入Discord</a-button></a
            >
          </template>
          <a class="btn">申请白名单</a>
        </a-popover>

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
.btn-discord,
.btn-account {
  display: inline-block;
  margin: 0 10px;
}
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
    display: inline-block;
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
<style lang="less">
.mobile{
  .banner{
    height: auto;
    width: auto;
    padding: 15px;
    margin: 0 -10px;
    .h1{
      font-size: 30px;
      margin-bottom: 15px;
    }
    p{
      width: 80%;
      font-size: 21px;
      span{
        padding: 15px 0;
      }
    }
    .btn{
      height: 45px;
      line-height: 45px;
    }
    .total{
      position: relative;
      width: 80%;
      margin-top: 15px;
      justify-content: space-between;
      b{
        font-size: 26px;
      }
    }
  }
}
</style>
