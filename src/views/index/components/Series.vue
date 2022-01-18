<template>
  <div class="row" id="detail">
    <div class="container">
      <div class="series">
        <div class="left">
          <div class="h2">卷卷元宇宙•山海经系列</div>
          <p>卷卷元宇宙的核心是玫瑰城堡。玫瑰城堡的秘密通道可以通往异世界。</p>
          <p>
            卷卷公主在每一个世界里都幻化成不同的身份，会遇到意想不到的奇怪朋友。在异世界1
            号-山海经世界，卷卷穿越无尽空洞黑暗，豁然见一片鲜草奇山，神兽巨凤穿梭天地间，美不胜收。
          </p>
          <p>
            卷卷玄幻世界之山海经是在区块链上随机和编程生成的6024个NFT的集合。其中包含卷卷24个，四大神兽青龙、白虎、朱雀、玄武各1500个。他们拥有不同稀有度的服饰，装扮、道具和特征，每一个都是独一无二的。
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
      line-height: 50px;
      color: #d49101;
      margin: 40px 0;
    }
    p {
      width: 360px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      text-align: justify;
      color: #4e4e4e;
      margin-bottom: 20px;
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
      font-size: 30px;
      margin-bottom: 15px;
      margin-top: 0;
    }
  }
}
</style>
