<template>
  <div class="nfts-item" v-if="isReveal">
    <a-popover placement="right">
      <template slot="content">
        <div class="nfts-detail">
          <div class="left">
            <div class="round">
              <img :src="`${urlIpfs}/${item.media}`" alt="" />
              <div class="star">
                <a-icon type="heart"></a-icon>
                <!-- <img :src="signs[sign]" v-if="sign" />
                <img src="../../../assets/star.png" alt="" v-else /> -->
              </div>
            </div>
            <div class="h6">
              {{ item.title }}
            </div>
            <div class="progress">
              <div class="stars">
                {{
                  (info.attributes &&
                    (info.attributes.filter(item => item.trait_type === 'Character rarity')[0] || {}).value) ||
                    '★★★★'
                }}
              </div>
              <!-- <img src="../../../assets/ti1.png" alt="" /> -->
              <!-- <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress> -->
            </div>
            <!-- <div class="progress">
              <img src="../../../assets/ti2.png" alt="" />
              <a-progress :percent="50" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
            </div>
            <div class="progress">
              <img src="../../../assets/ti3.png" alt="" />
              <a-progress :percent="25" :showInfo="false" strokeColor="#464646" size="small"></a-progress>
            </div> -->
          </div>
          <div class="right">
            <template v-for="(itm, idx) in info.attributes || info">
              <span :key="idx"> {{ idx }} : {{ itm }} </span>
            </template>
          </div>
        </div>
      </template>

      <img :src="src" alt="" @load="handleLoad" v-show="!loading" />
      <a-spin v-show="loading">
        <a-icon slot="indicator" type="loading" :style="{ fontSize: '30px', color: '#efb437' }" spin />
      </a-spin>
      <a-icon type="heart"></a-icon>
      <div class="code">
        #{{ tokenId }}

        <!-- <img :src="signs[sign]" v-if="sign" />
        <img src="../../../assets/star.png" alt="" v-else /> -->
        <div class="stars">
          {{
            (info.attributes &&
              (info.attributes.filter(item => item.trait_type === 'Character rarity')[0] || {}).value) ||
              '★★★★'
          }}
        </div>
      </div>
    </a-popover>
  </div>
  <div class="nfts-item nfts-item-reveal" v-else>
    <img src="../../../assets/reveal.png" alt="" />
    <a-icon type="heart"></a-icon>
    <div class="code">#{{ tokenId }}<img src="../../../assets/unknow.png" alt="" /></div>
    <div class="reveal">
      <div class="btn" @click="handleReveal({ [item.title]: true })">Reveal</div>
    </div>
  </div>
</template>
<script>
import Aquarius from '../../../assets/icons/Aquarius.svg'
import Pisces from '../../../assets/icons/Pisces.svg'
import Aries from '../../../assets/icons/Aries.svg'
import Taurus from '../../../assets/icons/Taurus.svg'
import Gemini from '../../../assets/icons/Gemini.svg'
import Cancer from '../../../assets/icons/Cancer.svg'
import Leo from '../../../assets/icons/Leo.svg'
import Virgo from '../../../assets/icons/Virgo.svg'
import Libra from '../../../assets/icons/Libra.svg'
import Scorpio from '../../../assets/icons/Scorpio.svg'
import Sagittarius from '../../../assets/icons/Sagittarius.svg'
import Capricorn from '../../../assets/icons/Capricorn.svg'

const signs = {
  Aquarius,
  Pisces,
  Aries,
  Taurus,
  Gemini,
  Cancer,
  Leo,
  Virgo,
  Libra,
  Scorpio,
  Sagittarius,
  Capricorn
}
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    tokenId: {
      type: String,
      default: ''
    },
    isReveal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      info: {},
      signs: signs,
      loading: true
    }
  },
  computed: {
    urlIpfs () {
      return this.app.urlIpfs
    },
    app () {
      return this.$store.state.near.app || {}
    },
    src () {
      return new URL(this.item.media, this.urlIpfs).href
    },
    sign () {
      return this.funcSign(this.info)
    }
  },
  created () {
    this.fetchReference()
  },
  methods: {
    handleLoad () {
      this.loading = false
    },
    async fetchReference () {
      try {
        const response = await fetch(`${this.urlIpfs}/${this.item.reference}`)
        this.info = await response.json()
      } catch (e) {
        console.log(e)
      }
    },
    handleReveal (revealMisfits) {
      const newRevealMisfits = { ...this.app.revealMisfits, ...revealMisfits }

      this.$store.commit('near/UPDATE_APP', {
        ...this.app,
        revealMisfits: newRevealMisfits
      })
      localStorage.setItem('revealMisfits', JSON.stringify(newRevealMisfits))
    },
    funcSign (info) {
      if (!info) {
        return
      }

      for (const key in info.attributes) {
        if (key === 'Sign') {
          return info[key]
        }
      }
    }
  }
}
</script>
<style lang="less">
.nfts {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  &-item {
    position: relative;
    width: 257px;
    height: 257px;
    border: 8px solid #efb437;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    margin-bottom: 50px;
    margin-left: 21px;
    margin-right: 22px;
    img {
      max-width: 100%;
    }
    .ant-spin {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -15px;
      margin-top: -15px;
    }
    .anticon-heart {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 28px;
      height: 28px;
      border-radius: 100%;
      background: #fff;
      line-height: 32px;
      text-align: center;
      color: #efb437;
      font-size: 16px;
    }
    .code {
      position: absolute;
      bottom: 20px;
      left: 50%;
      margin-left: -79px;
      width: 158px;
      height: 31px;
      background: #ffffff;
      border-radius: 52px;
      padding: 0 15px;
      line-height: 31px;
      color: #3f4246;
      img {
        float: right;
        margin: 5px 0;
        width: 20px;
        height: 20px;
      }
      .stars {
        float: right;
        color: #efb437;
      }
    }
    &-reveal {
      .reveal {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.79);
        justify-content: center;
        align-items: center;
        .btn {
          width: 93px;
          height: 31px;
          font-size: 12px;
          color: #fff;
          font-weight: 600;
          text-align: center;
          line-height: 31px;
          background: #efb437;
          border-radius: 15.5px;
        }
      }
      &:hover {
        .reveal {
          display: flex;
        }
      }
    }
  }

  &-detail {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    .round {
      position: relative;
      & > img {
        width: 140px;
        height: 140px;
        border-radius: 70px;
      }
      .star {
        width: 48px;
        height: 48px;
        position: absolute;
        right: -10px;
        bottom: 10px;

        display: flex;
        justify-content: center;
        align-items: center;

        background: #ffffff;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
        border-radius: 24px;
        img {
          width: 20px;
          height: 20px;
        }
        .anticon {
          font-size: 24px;
          color: #efb437;
        }
      }
    }
    .h6 {
      color: #3f4246;
      text-align: center;
      margin: 15px 0 10px;
    }
    .right {
      margin-left: 35px;
      font-weight: 500;
      font-size: 14px;
      line-height: 30px;
      color: #3f4246;
      word-break: break-all;
      span {
        display: block;
      }
    }
    .progress {
      display: flex;
      justify-content: space-between;
      line-height: 26px;
      height: 26px;
      align-items: center;
      img {
        margin-right: 15px;
      }
      .stars {
        text-align: center;
        color: #efb437;
        font-size: 20px;
        width: 140px;
      }
    }
  }
}
</style>
<style lang="less">
.mobile{
  .nfts{
    flex-wrap: wrap;
    justify-content: space-around;
    &-item{
      width: 46%;
      height: auto;
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 15px;
      .code{
        bottom: 15px;
        max-width:  96%;
        margin-left: -48%;
      }
    }
  }
}
</style>
