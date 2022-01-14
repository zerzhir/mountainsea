<template>
  <div class="row">
    <div class="container">
      <div class="themes">
        <div class="themes-item">
          <img src="../../../assets/t1.png" alt="" />
          <div class="h6">
            JuanJuan
            <div class="star">
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
            </div>
          </div>
          <div class="progress">
            <img src="../../../assets/ti1.png" alt="" />
            <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="progress">
            <img src="../../../assets/ti2.png" alt="" />
            <a-progress :percent="50" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="progress">
            <img src="../../../assets/ti3.png" alt="" />
            <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="time">
            Ends In <br />
            <b>30:45:57</b>
          </div>
        </div>
        <div class="themes-item">
          <img src="../../../assets/t2.png" alt="" />
          <div class="h6">
            白虎
            <div class="star">
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
            </div>
          </div>
          <div class="progress">
            <img src="../../../assets/ti1.png" alt="" />
            <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="progress">
            <img src="../../../assets/ti2.png" alt="" />
            <a-progress :percent="50" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="progress">
            <img src="../../../assets/ti3.png" alt="" />
            <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="time">
            Ends In <br />
            <b>30:45:57</b>
          </div>
        </div>
        <div class="themes-item">
          <img src="../../../assets/t3.png" alt="" />
          <div class="h6">
            青龙
            <div class="star">
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
            </div>
          </div>
          <div class="progress">
            <img src="../../../assets/ti1.png" alt="" />
            <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="progress">
            <img src="../../../assets/ti2.png" alt="" />
            <a-progress :percent="50" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="progress">
            <img src="../../../assets/ti3.png" alt="" />
            <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="time">
            Ends In <br />
            <b>30:45:57</b>
          </div>
        </div>
        <div class="themes-item">
          <img src="../../../assets/t4.png" alt="" />
          <div class="h6">
            朱雀
            <div class="star">
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
            </div>
          </div>
          <div class="progress">
            <img src="../../../assets/ti1.png" alt="" />
            <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="progress">
            <img src="../../../assets/ti2.png" alt="" />
            <a-progress :percent="50" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="progress">
            <img src="../../../assets/ti3.png" alt="" />
            <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="time">
            Ends In <br />
            <b>30:45:57</b>
          </div>
        </div>
        <div class="themes-item">
          <img src="../../../assets/t5.png" alt="" />
          <div class="h6">
            玄武
            <div class="star">
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
              <img src="../../../assets/star.png" alt="" />
            </div>
          </div>
          <div class="progress">
            <img src="../../../assets/ti1.png" alt="" />
            <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="progress">
            <img src="../../../assets/ti2.png" alt="" />
            <a-progress :percent="50" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="progress">
            <img src="../../../assets/ti3.png" alt="" />
            <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
          </div>
          <div class="time">
            Ends In <br />
            <b>30:45:57</b>
          </div>
        </div>
      </div>
      <div class="btn themes-btn" @click="handleBuy">
        更多组合
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
.themes {
  display: flex;
  justify-content: space-around;
  &-item {
    width: 213px;
    padding: 3px 18px 20px;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    border-radius: 26px;
    & > img {
      border-bottom: 1px solid #c4c4c4;
      width: 100%;
    }
    .h6 {
      font-size: 14px;
      color: #c4c4c4;
      line-height: 34px;
      .star {
        float: right;
        img {
          width: 10px;
        }
      }
    }
    .progress {
      display: flex;
      justify-content: space-between;
      line-height: 26px;
      height: 26px;
      align-items: center;
      img {
        margin-right: 15px;
      }
    }
    .time {
      font-size: 9px;
      color: #3f4246;
      b {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  &-btn {
    width: 139px;
    height: 45px;
    margin: 50px auto;

    background: #d49101;
    font-size: 16px;
    line-height: 45px;
    text-align: center;
    letter-spacing: 0.01em;

    color: #ffffff;
  }
}
</style>
