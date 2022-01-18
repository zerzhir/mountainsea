<template>
  <div class="row row-footer">
    <div class="container footer">
      <div class="built-on">
        <div class="h5">
          BUILT ON
        </div>
        <img src="../../assets/logo-footer.png" alt="" />
        <p>Mountainsea NFTs are built on top of NEAR Protocol, where minting NFTs cost less than a cent per item.</p>
        <a href="https://discord.gg/cMeSWKQ66p" target="blank">
          <z-icon
            type="icon-discord"
            :style="{
              color: '#FFEFCD',
              fontSize: '24px'
            }"
          />
        </a>
        <a href="https://twitter.com/Mountainsea_nft" target="blank">
          <a-icon
            type="twitter"
            :style="{
              color: '#FFEFCD',
              fontSize: '27px'
            }"
          />
        </a>
        <a href="https://t.me/shanhaijingmeta" target="blank">
          <z-icon
            type="icon-telegram"
            :style="{
              color: '#FFEFCD',
              fontSize: '24px'
            }"
          />
        </a>
      </div>
      <div class="fast-links">
        <div class="fast-links-item">
          <div class="h5">学习</div>
          <a href="/index#detail">详情</a>
          <a href="/index#level">稀有度</a>
          <a href="/index#right">权益</a>
          <a href="/index#faq">FAQ</a>
        </div>
        <div class="fast-links-item">
          <div class="h5">我的NFT</div>
          <a href="/nfts">My NFT</a>
        </div>
        <div class="fast-links-item">
          <div class="h5">Linkdrop</div>
          <a href="/linkdrop">Linkdrop</a>
        </div>
        <div class="fast-links-extra">
          <!-- <span>微博：</span> @山海经元宇宙吧 <br />
          <span>小红书：</span> @山海经元宇宙吧 <br />
          <span>公众号：</span> @山海经元宇宙吧 <br /> -->
        </div>
      </div>
      <a-divider><div class="copy">© 2022 TenKBay DAO. All Rights Reserved.</div></a-divider>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {}
}
</script>
<style lang="less">
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 85px 0 20px;
  color: #ffefcd;
  font-size: 14px;
  .built-on {
    .h5 {
      font-size: 16px;
      line-height: 150%;
      letter-spacing: 0.4em;
      text-transform: uppercase;
    }
    img {
      margin-top: 8px;
      margin-bottom: 34px;
      width: 142px;
    }
    p {
      width: 341px;
      font-weight: 500;
      font-size: 16px;
      line-height: 150%;
    }
    .anticon {
      margin-right: 27px;
    }
  }
  .fast-links {
    display: flex;
    justify-content: space-around;
    position: relative;
    &-item {
      width: 165px;
      .h5 {
        font-weight: bold;
        font-size: 16px;
        line-height: 115%;
        line-height: 40px;
      }
      a {
        display: inline-block;
        width: 100%;
        font-size: 16px;
        line-height: 48px;
        color: #ffefcd;
      }
    }
    &-extra {
      position: absolute;
      bottom: 5px;
      left: 165px;
      font-size: 16px;
      line-height: 40px;
      color: #ffdb8c;
      span {
        display: inline-block;
        width: 70px;
      }
    }
  }
  .copy {
    color: #ffefcd;
  }
  .ant-divider {
    margin-top: 50px !important;
  }
}
</style>
<style lang="less">
.mobile{
  .footer{
    .built-on{
      width: 100%;
      margin-top: 40px;
      margin-bottom: 20px;
      padding-left: 20px;
      // text-align: center;
      p{
        width: 100%;
      }
    }
    .fast-links{
      width: 100%;
      justify-content: space-around;
      &-item{
        width: 25%;
        // text-align: center;
      }
    }
  }
}
</style>
