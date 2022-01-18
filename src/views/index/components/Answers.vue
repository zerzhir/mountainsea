<template>
  <div class="row" id="faq">
    <div class="container">
      <div class="title">
        常见问题
      </div>
      <div class="answers">
        <a-row :gutter="30">
          <a-col :span="24" :sm="12">
            <div class="answers-item">
              <div class="h4">如何参与？</div>
              <p>Mountainsea 于 2022 年 1 月 15日推出，首发一共发行有 6024 个 NFT 头像</p>
            </div>

            <div class="answers-item">
              <div class="h4">什么是元宇宙Metaverse？</div>
              <p>
                Metaverse 指的是一种共享的虚拟体验，可以在其中买卖土地、头像和名称，通常使用加密货币。NEAR
                正在快速增长，并逐渐成为具有游戏和其他虚拟体验的丰富 Metaverse 的底层构架
              </p>
            </div>

            <div class="answers-item">
              <div class="h4">我可以用我的 NEAR Misfit 做什么？</div>
              <p>
                在非独占许可下，您可以自由地对它们做任何事情。我们鼓励您将它们作为您的社交媒体头像（Twitter、Discord
                等）大声和自豪地展示出来，很快您就可以在 NEAR 上不断增长的 Meta-verse 上使用它
              </p>
            </div>

            <div class="answers-item">
              <div class="h4">为什么需要版税？</div>
              <p>
                特许权使用费的金额固定为 15%，以资助 Mountainsea
                的未来发展。我们雄心勃勃，并计划在全球范围内开展一系列项目和活动，以发展和加强 Mountainsea 生态系统
              </p>
            </div>
          </a-col>
          <a-col :span="24" :sm="12">
            <div class="answers-item">
              <div class="h4">二期开往元宇宙？！</div>
              <p>
                是的！Mountainsea 是只有 6024 个 NFT 的独家限量系列。
              </p>
              <p>
                之后可能会发布更多灵宠，通过升级后跨界合体，就能有更多高级的 Generations - NFT可组合性
              </p>
            </div>
            <div class="answers-item">
              <div class="h4">NEAR Misfits 是一项不错的投资吗？</div>
              <p>
                这最终是由您做出的判断。我们创建了 Mountainsea，让您在进入 Mountainsea Metaverse
                时成为最好的自己。我们相信，随着 Mountainsea 的生态系统的发展，前景是令人振奋的。想要加入 Mountainsea
                俱乐部的人可能更多。请注意，很难确定未来会发生什么！
              </p>
              <p>
                希望Mountainsea 登上月球，但就像生活中的任何事情一样，不要花费承受不起的金钱，享受旅程！
              </p>
            </div>
            <div class="answers-item">
              <div class="h4">开发团队</div>
              <p>
                JUANJUAN - 灵魂设计团队
              </p>
              <p>
                FOXYEAR - 有个性的开发者
              </p>
              <p>
                NEAR - 跨项目合作团队
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
      line-height: 60px;
      color: #262626;
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
    &-item {
      width: 100%;
      p {
        flex: 1;
        padding-left: 10px;
      }
    }
  }
}
</style>
