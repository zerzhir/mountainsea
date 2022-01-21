<template>
  <div class="row">
    <div class="container">
      <div class="themes">
        <div class="themes-item">
          <img src="../../../assets/t1.png" alt="" />
          <div class="h6">
            JUANJUAN
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
          <!-- <div class="time">
            Ends In <br />
            <b>{{ countDown }}</b>
          </div> -->
        </div>
        <div class="themes-item">
          <img src="../../../assets/t2.png" alt="" />
          <div class="h6">
            WHITE TIGER

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
          <!-- <div class="time">
            Ends In <br />
            <b>{{ countDown }}</b>
          </div> -->
        </div>
        <div class="themes-item">
          <img src="../../../assets/t3.png" alt="" />
          <div class="h6">
            AZURE DROGEN
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
          <!-- <div class="time">
            Ends In <br />
            <b>{{ countDown }}</b>
          </div> -->
        </div>
        <div class="themes-item">
          <img src="../../../assets/t4.png" alt="" />
          <div class="h6">
            VERMILION BIRD
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
          <!-- <div class="time">
            Ends In <br />
            <b>{{ countDown }}</b>
          </div> -->
        </div>
        <div class="themes-item">
          <img src="../../../assets/t5.png" alt="" />
          <div class="h6">
            BLACK TORTOISE
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
          <!-- <div class="time">
            Ends In <br />
            <b>{{ countDown }}</b>
          </div> -->
        </div>
      </div>
      <div class="btn themes-btn" @click="handleBuy">
        More combinations
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    wallet () {
      return this.$store.state.near.wallet || {}
    },
    countDown () {
      return this.funcDay() + '天' + this.funcTime()
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
    },
    funcDay () {
      const deadline = new Date('2022/01/22 11:00:00').valueOf()
      const day = Math.floor((deadline - new Date().valueOf()) / (24 * 3600 * 1000))
      return day.toString()
    },
    funcTime () {
      const deadline = new Date('2022/01/22 11:00:00').valueOf()
      const time = (deadline - new Date().valueOf()) % (24 * 3600 * 1000)
      if (time > 0) {
        const h = Math.floor(time / (3600 * 1000))
        const m = Math.floor((time - h * 3600 * 1000) / 60 / 1000)
        const s = Math.floor((time - h * 3600 * 1000 - m * 60 * 1000) / 1000)
        const hs = h.toString().length === 1 ? '0' + h : h.toString()
        const ms = m.toString().length === 1 ? '0' + m : m.toString()
        const ss = s.toString().length === 1 ? '0' + s : s.toString()
        return hs + ':' + ms + ':' + ss
      } else {
        return false
      }
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
      padding: 10px 0 5px;
      font-size: 14px;
      color: #c4c4c4;
      line-height: 20px;
      text-align: center;
      .star {
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
    width: 211px;
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
<style lang="less">
.mobile {
  .themes {
    flex-wrap: wrap;
    justify-content: center;
    padding: 6px;
    &-item {
      width: 31%;
      margin: 0 1.1666%;
      padding: 10px 14px 10px;
      margin-bottom: 15px;
      .h6{
        font-size: 9px;
        margin: 0 -10px;
      }
    }
    &-btn{
      margin: 20px auto 40px;
    }
  }
}
</style>
