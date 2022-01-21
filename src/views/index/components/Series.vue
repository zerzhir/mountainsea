<template>
  <div class="row" id="detail">
    <div class="container">
      <div class="series">
        <div class="left">
          <div class="h2">The JuanJuan Metaverse <br>Mountain&sea</div>
          <p>At the heart of the Mountain&Sea Metaverse  is the Rose Castle.The rose Castle's secret passageway leads to another world.</p>
          <p>
            In each world, JuanJuan Princess transforms into a different identity and meets strange and unexpected friends. In the different world no. 1 - The world of Mountain&Sea, roll through the endless empty darkness, suddenly see a strange mountain of fresh grass, god beast feng shuttle between heaven and earth, beautiful.
          </p>
          <p>
            Mountain&Sea metaverse is a collection of 2022 NFT randomly and programmatically generated on the blockchain. Including JuanJuan 24, four god beast azure drogen, white tiger, vermilion bird, black tortoise 1500 each.
          </p>
        </div>
        <div class="right">
          <img src="../../../assets/s1.png" alt="" />
          <img src="../../../assets/s2.png" alt="" />
          <img src="../../../assets/s3.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.series {
  display: flex;
  justify-content: space-between;
  margin: 60px 0;
  .left {
    .h2 {
      font-size: 36px;
      line-height: 41px;
      color: #d49101;
      margin-bottom: 25px;
    }
    p {
      width: 421px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      text-align: justify;
      color: #4e4e4e;
      margin-bottom: 5px;
    }
  }
  .right {
    width: 657px;
    img {
      float: left;
      margin-bottom: 11px;
      margin-left: 11px;
    }
  }
}
</style>
<style lang="less">
.mobile {
  .series {
    height: auto;
    width: auto;
    padding: 0;
    margin: 20px 0;
    flex-wrap: wrap;
    .left,
    .right {
      width: 100%;
      p{
        width: 100%;
        font-size: 10px;
      }
      img{
        width: 40%;
        margin-left: 0;
        height: 117px;
        &:first-child{
          width: 60%;
          padding-right: 10px;
          height: 245px;
        }
      }
    }
    .h2 {
      font-size: 18px;
      margin-bottom: 10px;
      margin-top: 0;
      line-height: 26px;
    }
  }
}
</style>
