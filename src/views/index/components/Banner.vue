<template>
  <div class="row">
    <div class="container">
      <div class="banner">
        <div class="h1">
          The JuanJuan Metaverse <br>Mountain&sea
        </div>
        <p>
          Join an Exclusive Community of Mountainsea Metaverse early adopters and BUIDLers. <br />
          <span>Release Date: January 22, 2022</span>
        </p>
        <!-- <div class="btn" @click="handleBuy">{{ wallet.signedIn ? 'Buy Your First' : 'Connect Wallet' }}</div> -->
        <a-popover>
          <template slot="content">
            <a
              class="btn btn-account"
              href="https://wj.qq.com/s2/9609897/8982"
              target="_blank"
            ><a-button type="primary">Submit user info</a-button></a
            >
            <a
              class="btn btn-discord"
              href="https://discord.gg/cMeSWKQ66p"
              target="_blank"
            ><a-button type="primary">Join Discord</a-button></a
            >
          </template>
          <a class="btn">Apply Whitelist</a>
        </a-popover>

        <div class="total">
          <div class="total-item">
            <b>24</b> <br />
            JUAN<br /> JUAN
          </div>
          <div class="total-item">
            <b>1.5K</b><br />
            WHITE<br /> TIGER
          </div>
          <div class="total-item">
            <b>1.5K</b><br />
            AZURE<br /> DROGEN
          </div>
          <div class="total-item">
            <b>1.5K</b><br />
            VERMILION<br /> BIRD
          </div>
          <div class="total-item">
            <b>1.5K</b><br />
            BLACK <br />TORTOISE
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
  padding: 64px 45px;
  position: relative;
  .h1 {
    font-weight: bold;
    font-size: 46px;
    line-height: 53px;
    margin-bottom: 25px;
  }
  p {
    width: 584px;
    font-size: 20px;
    line-height: 30px;
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

      b {
        font-weight: 600;
        font-size: 31px;
        line-height: 46px;
        color: #d49101;
        padding-bottom: 6px;
      }
    }
  }
}
</style>
<style lang="less">
.mobile{
  .banner{
    background: url(../../../assets/banner_mb.png) no-repeat top center;
    background-size: 100% auto;
    height: auto;
    width: auto;
    padding: 15px;
    .h1{
      font-size: 17px;
      margin-bottom: 10px;
      line-height: 25px;
    }
    p{
      width: 80%;
      font-size: 10px;
      line-height: 18px;
      span{
        padding: 10px 0;
      }
    }
    .btn{
      height: 20px;
      line-height: 20px;
      font-size: 10px;
      width: auto;
      padding: 0 15px;
    }
    .total{
      position: relative;
      width: 76%;
      margin-top: 10px;
      font-size: 9px;
      justify-content: space-between;
      &-item{
        font-size: 9px;
      }
      b{
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
}
</style>
