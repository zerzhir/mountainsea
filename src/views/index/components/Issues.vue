<template>
  <div class="row" id="level">
    <div class="container">
      <div class="title title-black">
        总发行数量：6024
      </div>
      <div class="issues">
        <div class="issues-item">
          <div class="h5">24</div>
          <div class="star">
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
          </div>
          <span>典藏</span>
        </div>
        <div class="issues-item">
          <div class="h5">147</div>
          <div class="star">
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
          </div>
          <span>稀有</span>
        </div>
        <div class="issues-item">
          <div class="h5">235</div>
          <div class="star">
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
          </div>
          <span>独家</span>
        </div>
        <div class="issues-item">
          <div class="h5">1376</div>
          <div class="star">
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
          </div>

          <span>特别</span>
        </div>
        <div class="issues-item">
          <div class="h5">2732</div>
          <div class="star">
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
          </div>
          <span>花式</span>
        </div>
        <div class="issues-item">
          <div class="h5">1518</div>
          <div class="star">
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
          </div>
          <span>普通</span>
        </div>
      </div>
      <div class="issues-remarks">
        每一个NFT拥有的稀有度在不同场景下均有差异，具体价值敬请期待后续...
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.issues {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  padding-bottom: 50px;
  &-item {
    width: 175px;
    height: 213px;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    border-radius: 26px;
    text-align: center;
    padding: 20px 25px 30px;
    .h5 {
      font-weight: 600;
      font-size: 36px;
      line-height: 50px;

      text-align: center;

      color: #3f4246;
    }
    span {
      font-weight: 500;
      font-size: 20px;
      line-height: 40px;
      text-align: center;

      color: #262626;
    }
    .star{
      height: 80px;
      padding: 13px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      img{
        width: 27px;
        margin: 2px;
      }
    }
  }
  &-remarks{
    text-align: center;
    font-size: 19px;
    color: #262626;
    margin-bottom: 60px;
  }
}
</style>
