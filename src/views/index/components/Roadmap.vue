<template>
  <div class="row">
    <div class="container">
      <div class="title">线路图规划</div>
      <div class="roadmap">
        <div class="roadmap-item">
          <div class="round">Q1</div>
          <p>
            我们推出限量盲盒抢购，到60%阶段，推出收集活动，完成指定主题的NFT收集挑战，将提供特殊元素NFT作品作为奖励
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">Q1</div>
          <p>
            与市场达成协议，发布后，所有Mountainsea
            NFT都将有机会在NEAR市场上市，我们将致力于建立一个强大的社区，在Twitter和Discord上进行精彩的展示
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">Q1</div>
          <p>
            发售100%后，推出卷卷山海经元宇宙，通过参与社区活动获得积分，凭借积分领养专属灵宠，并且通过仙草孵化灵宠，武装升级，就能与跨界的灵宠合成专属NFT
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">Q2</div>
          <p>
            灵宠进化：山海经元宇宙里的灵宠有火系、光系、冰系、植物系、等等多个种族，小宠物刚领养的时候灵力值很低，需要耐心的培育、升级，在仙草或者仙果的加持下，灵宠满级后能大变身，更有炫酷刺激的跨种族合体，合体后的新种族神兽值得期待
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">Q3</div>
          <p>
            官方保留了部分未揭秘的特殊NFT，将在这一阶段慢慢解开面纱。这批NFT最终是以PK的形式，奖励给获胜方。只要你踊跃参与社区的活动，就有机会获取
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">Q4</div>
          <p>
            1）我们将推出DAO，这将使社区的每个成员都能参与决策，共建社区 <br> 2）我们将把收取金额的15%分配给MSDAOment基金 <br>
            3）我们继续扩大我们的团队，开发新的场景和有趣的产品
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
  background: url(../../../assets/roadmap.png) no-repeat center 20px;
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
      font-size: 45px;
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
<style lang="less">
.mobile {
  .roadmap {
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
