<template>
  <div class="row">
    <div class="container">
      <div class="title">线路图规划</div>
      <div class="roadmap">
        <div class="roadmap-item">
          <div class="round">1</div>
          <p>
            奇幻无穷的山海经元宇宙世界，首期以盲盒的形式发售构建山海经元宇宙的身份标识，这些标识既是高端的数字藏品，又是构建下一阶段山海经元宇宙世界的重要构件。
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">2</div>
          <p>
            卷卷公主的店铺要开张了，萌萌的小宠物即将登场，山海经神兽们可以开始领养小宠物啦，大家可以一起喂养小宠物。
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">3</div>
          <p>不同的萌宠合成会有什么样的彩蛋呢？是新的神兽形象还是新的技能，敬请期待！</p>
        </div>
        <div class="roadmap-item">
          <div class="round">4</div>
          <p>
            山海经世界里有400多个不同形象的神怪奇兽让你目接不暇，它们哪些是代表福气、运气、快乐、生命、邪恶、恐怖、惊恐、黑暗呢？敬请期待！
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">5</div>
          <p>
            山海经世界元宇宙大门即将开启，神兽们一起回到神话神界，开天辟地、后羿射日、炎黄战蚩尤、不周山倒等神话故事将一一呈现。
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">6</div>
          <p>山海经元宇宙世界为神兽们打开3D虚拟空间，一起畅游音乐吧、宝藏会、书画展、山海商城、山珍海味店等！</p>
        </div>
        <div class="roadmap-item">
          <div class="round">7</div>
          <p>
            象限无界，无限精彩。我们将带你走进更多的卷卷元宇宙世界中，卷卷火星重庆森林元宇宙世界、卷卷红楼梦元宇宙世界。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.roadmap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
  background: url(../../../assets/roadmap.png) no-repeat center center;
  &-item {
    width: 583px;
    height: 159px;

    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    border-radius: 82px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 43px;
    .round {
      width: 131px;
      height: 131px;
      font-weight: 800;
      font-size: 79px;
      line-height: 131px;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      background: #d49101;
      margin-left: 16px;
    }
    p {
      width: 389px;
      margin-right: 30px;
      font-size: 14px;
      line-height: 25px;
      color: #3f4246;
    }
  }
}
</style>
