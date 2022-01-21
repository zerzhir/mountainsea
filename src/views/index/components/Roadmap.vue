<template>
  <div class="row">
    <div class="container">
      <div class="title">ROAD MAP</div>
      <div class="roadmap">
        <div class="roadmap-item">
          <div class="round">Q1</div>
          <p>
            1) We launched limited blind box purchases, and at the 60% stage, we launched collection activities to
            complete NFT collection challenges with designated themes, and special element NFT works will be provided as
            rewards
            <br />
            2) After reaching an agreement with the market, after release, all Mountainsea NFTs will have the
            opportunity to be listed on the NEAR market, and we will work on building a strong community with great
            presentations on Twitter and Discord
            <br />
            3) After 100% of the sale, launch the Scroll of Mountains and Seas Metaverse, earn points by participating
            in community activities, adopt exclusive pets with the points, hatch pets through fairy grass, and upgrade
            their weapons, so that they can synthesize exclusive pets with cross-border pets. NFT
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">Q2</div>
          <p>
            Spiritual pet evolution: Spiritual pets in the Mountainsea Metaverse include fire, light, ice, plant, and
            many other races. When a small pet was first adopted, its spiritual value was very low, and it required
            patience to nurture and upgrade. Under the blessing of immortal grass or immortal fruit, spiritual pets can
            transform greatly after reaching full level, and there are more cool and exciting cross-racial integrations.
            The new racial beasts after the integration are worth looking forward to.
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">Q3</div>
          <p>
            The official retains some undisclosed special NFTs, and will slowly unveil at this stage. These batches of
            NFTs are finally rewarded to the winning party in the form of PK. As long as you actively participate in the
            activities of the community, you have the opportunity to obtain
          </p>
        </div>
        <div class="roadmap-item">
          <div class="round">Q4</div>
          <p>
            1) We will launch DAO, which will enable every member of the community to participate in decision-making and
            build the community together<br />
            2) We will allocate 15% of the collected amount to the MSDAOment fund<br />
            3) We continue to expand our team to develop new scenarios and interesting products
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
  padding: 18px 0;
  background: url(../../../assets/roadmap.png) no-repeat center 20px;
  &-item {
    width: 100%;
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
      flex: 1;
      margin-right: 30px;
      font-size: 14px;
      line-height: 21px;
      color: #3f4246;
      padding-left: 12px;
      padding-top: 10px;
    }
  }
}
</style>
<style lang="less">
.mobile {
  .roadmap {
    flex-wrap: wrap;
    background: none;
    padding-bottom: 0;
    &-item {
      width: 100%;
      height: auto;
      border-radius: 21px;
      align-items: stretch;
      .round{
        border-radius: 15px;
        display: flex;
        align-items: center;
        width: 58px;
        height: auto;
        margin: 10px;

        font-size: 30px;
        justify-content: center;
      }
      p {
        flex: 1;
        padding-left:0;

      }
    }
  }
}
</style>
