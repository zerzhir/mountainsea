<template>
  <div class="row" id="right">
    <div class="container">
      <div class="why">
        <div class="left">
          <div class="h2">为什么要购买NFT？</div>
          <p>
            由艺术家倾力创作，顶级手绘水准，是投资者和艺术收藏者最佳选择。1件数字作品=1张踏入元宇宙的门票。拥有1件，你就拥有1个山海经元宇宙的身份标识，成为了下一阶段山海经元宇宙世界的重要角色。
          </p>
          <div class="h4">NFT用途：</div>
          <ul>
            <li>1.收藏一个属于你的山海经作品，等待升值</li>
            <li>2.有机会参与挑战活动，获得奖品3.有资格领养灵宠，孵化升级合成NFT</li>
          </ul>
          <div class="tip">卷卷山海经元宇宙强势来袭！</div>
        </div>
        <div class="right">
          <div class="h3">确定二级市场 <a class="btn" @click="handleBuy">进入购买</a></div>
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
      this.$message.warning('请先连接钱包')
    }
  }
}
</script>
<style lang="less">
.why {
  position: relative;
  width: 100%;
  height: 662px;
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
    font-size: 36px;
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
