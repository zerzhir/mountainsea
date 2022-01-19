<template>
  <div class="row" id="level">
    <div class="container">
      <div class="title title-black">
        Types of roles： 6024
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
          <span>COLLECTION</span>
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
          <span>RARE</span>
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
          <span>EXCLUSIVE</span>
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

          <span>SPECIAL</span>
        </div>
        <div class="issues-item">
          <div class="h5">2732</div>
          <div class="star">
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
          </div>
          <span>FANCY</span>
        </div>
        <div class="issues-item">
          <div class="h5">1518</div>
          <div class="star">
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
            <img src="../../../assets/star-lg.png" alt="" />
          </div>
          <span>COMMON</span>
        </div>
      </div>
      <div class="issues-remarks">
        The rarity of each NFT varies in different scenarios, and the specific value will be expected later…
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
    .star {
      height: 80px;
      padding: 13px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      img {
        width: 27px;
        margin: 2px;
      }
    }
  }
  &-remarks {
    text-align: center;
    font-size: 19px;
    color: #262626;
    margin-bottom: 60px;
  }
}
</style>
<style lang="less">
.mobile{
  .issues {
  flex-wrap: wrap;
  padding-bottom: 20px;
  &-item {
    width: 31%;
    height: auto;
    padding: 10px 14px 10px;
    margin-bottom: 15px;
    .h5{
      font-size: 24px;
    }
    span{
      font-size: 11px;
    }
    .star{
      height: 40px;
      padding: 0;
      img{
        width: 15px;
      }
    }
  }
  &-remarks{
    font-size: 12px;
    margin-bottom: 20px;
  }
}
}
</style>
