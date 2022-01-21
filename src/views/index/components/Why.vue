<template>
  <div class="row" id="right">
    <div class="container">
      <div class="why">
        <div class="left">
          <div class="h2">Why generate one?</div>
          <p>
            By the artist dedicated to the creation, top hand-painted level, is the best choice for investors and art collectors. 1 digital work =1 ticket to the meta-universe. If you have one, you will have one identity symbol and become an important player in the next phase of the Mountain&Sea Metaverse.
          </p>
          <div class="h4">NFT USES:</div>
          <ul>
            <li>1.Collect one of your classics of Mountains and Seas and wait for it to appreciate</li>
            <li>2.Have the opportunity to participate in the challenge activities and win prizes. </li>
            <li>3.Eligible to adopt a pet, hatch and upgrade synthetic NFT.</li>
          </ul>
          <div class="tip"></div>
        </div>
        <div class="right">
          <div class="h3">Identify secondary market <a class="btn" @click="handleBuy">Buy on Mintbase</a></div>
          <img src="../../../assets/why.png" alt="" />
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
      window.scrollTo(0, 0)
      this.$message.warning('Please connect wallet first')
    }
  }
}
</script>
<style lang="less">
.why {
  position: relative;
  width: 100%;
  margin-bottom: 60px;
  background: #ffffff url(../../../assets/cloud.png) no-repeat center center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 126px;
  padding: 60px 120px;
  display: flex;
  justify-content: space-between;
  .h2 {
    font-weight: bold;
    font-size: 36px;
    line-height: 120px;
    color: #d49101;
  }
  p,
  li {
    width: 350px;
    font-size: 16px;
    line-height: 25px;
    color: #262626;
  }
  ul {
    padding-left: 20px;
  }
  li {
    list-style: disc;
  }
  .h4 {
    font-size: 24px;
    line-height: 60px;
    color: #d49101;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .tip {
    font-size: 14px;
    color: #d49101;
    position: absolute;
    bottom: 70px;
    left: 120px;
  }
  .h3 {
    font-weight: bold;
    font-size: 21px;
    color: #d49101;
    .btn {
      display: inline-block;
      width: 200px;
      height: 72px;
      margin-left: 40px;

      background: #d49101;
      border-radius: 100px;
      font-size: 20px;
      font-weight: 800;
      line-height: 72px;
      text-align: center;
      color: #ffffff;
    }
  }
  img{
    width: 500px;
    margin-top: 20px;
  }
}
</style>
<style lang="less">
.mobile{
  .why{
    padding: 15px;
    border-radius: 35px;
    flex-wrap: wrap;
    height: auto;
    padding-bottom: 60px;
    margin-bottom: 30px;
    .left,.right{
      width: 100%;
    }
    .left{
      p,li{
        width: 100%;
        font-size: 10px;
      }
      .h2{
        font-size: 18px;
        line-height: 60px;
      }
    }
    .right{
      .h3{
        font-size: 11px;
        line-height: 40px;
        .btn{
          float: right;
          margin-left: 0;
          width: 140px;
          height: 40px;
          line-height: 40px;
          font-size: 11px;
        }
      }
      img{
        width: 100%;
      }
    }
    .tip{
      bottom: 30px;
    }
  }

}
</style>
