<template>
  <div class="row" id="faq">
    <div class="container">
      <div class="title">
        Frequently Asked Questions
      </div>
      <div class="answers">
        <a-row :gutter="30">
          <a-col :span="24" :sm="12">
            <div class="answers-item">
              <div class="h4">How do get involved?</div>
              <p>
                Mountainsea launched on January 22, 2022, with a total of 2022 NFT avatars issued
              </p>
            </div>

            <div class="answers-item">
              <div class="h4">What is the Metaverse?</div>
              <p>
                Metaverse refers to a shared virtual experience in which land, avatars and names can be bought and sold,
                often in cryptocurrency. NEAR is growing rapidly and becoming the underlying framework for a rich
                metaverse with games and other virtual experiences
              </p>
            </div>

            <div class="answers-item">
              <div class="h4">What can I do with my Mountain&Sea Metaverse NFT?</div>
              <p>
                You are free to do anything with them under a non-exclusive license. We encourage you to display them
                loud and proud as your social media head portrait(Twitter, Discord, etc.) and soon you will be able to
                use it on the growing Metaverse on NEAR.
              </p>
            </div>

            <div class="answers-item">
              <div class="h4">Why do we need royalties?</div>
              <p>
                The amount of royalties is fixed at 15% to finance the future developments of Mountainsea Ecosystem. We
                are very ambitious and have plans to run a series of projects and events around to world to grow and
                strengthen the Mountainsea ecosystem.
              </p>
            </div>
          </a-col>
          <a-col :span="24" :sm="12">
            <div class="answers-item">
              <div class="h4">When will the second installment arrive to the Me-taverse?</div>
              <p>
                Yes! Mountainsea is an exclusive limited series with only 6,024 NFT. <br />
                More pets may be released later, Cross-border integration after upgrading，have be more advanced
                Generations - NFT composability
              </p>
            </div>
            <div class="answers-item">
              <div class="h4">Mountain&Sea Metaverse NFT is a good investme-nt?</div>
              <p>
                That is ultimately a decision for you to make. We have created Mountainsea ，Ecosystem to be the best
                version of yourself as you enter the NEAR Metaverse. We believe that as the Mountainsea ecosystem
                grows，The outlook is exciting。There may be more people who want to join the Mountainsea club.Mind you,
                it's hard to tell what will happen in the future!
              </p>
              <p>
                Hope Mountainsea goes to the moon,But like anything in life,Don't bear the consumption that you can't
                afford，Enjoy the journey!
              </p>
            </div>
            <div class="answers-item">
              <div class="h4">Development team</div>
              <p>
                JUANJUAN - Soulfull design team
              </p>
              <p>
                FOXYEAR - Developers with personality
              </p>
              <p>
                NEAR TenKDAO - NEAR Collectible NFT Project Incubator
              </p>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.answers {
  margin-bottom: 80px;
  background: url(../../../assets/answer-bg.png) no-repeat top center;
  &-item {
    margin-bottom: 20px;
    .h4 {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      color: #262626;
      padding: 18px 0;
    }
    p {
      font-size: 14px;
      color: #262626;
    }
  }
}
</style>
<style lang="less">
.mobile {
  .answers {
    flex-wrap: wrap;
    background: none;
    margin-bottom: 30px;
    &-item {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
      .h4{
        font-size: 16px;
      }
      p {
        flex: 1;
        padding-left: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>
