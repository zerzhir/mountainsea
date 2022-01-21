<template>
  <div class="row">
    <div class="container">
      <div class="share-gifts">
        <div class="h1">
          Choose an NFT Blind Box Gift Link Share with friends
        </div>
        <div class="links">
          <div class="tip" v-if="!isMobile">Shareable links</div>
          <div class="tip" v-if="!isMobile">Who did I share this link with?</div>
          <a-radio-group v-model="linkIndex">
            <div class="links-item" v-for="(item, index) in linkdrops.slice(0,3)" :key="item.id">
              <a-radio :value="index" />
              <a-input :value="item.link">
                <a-icon type="copy" slot="suffix" theme="filled" @click="handleCopy(item.link)" />
              </a-input>
              <a-input v-model="item.text" @blur="handleBlur" placeholder="Who did I share this link with?"/>
            </div>
          </a-radio-group>
          <a class="btn" @click="handleSave" :href="saveUri" download="link-drops.txt" target="_blank">
            Save
          </a>
        </div>
        <div class="total">
          <share-links :linkdrop="linkdrops[linkIndex]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ShareLinks from './ShareLinks'
import { deviceMixin } from '@/store/device-mixin'
export default {
  mixins: [deviceMixin],
  props: {
    links: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    ShareLinks
  },
  data () {
    return {
      linkIndex: 0,
      linkdrops: []
    }
  },
  computed: {
    app () {
      return this.$store.state.near.app || {}
    },
    account () {
      return this.$store.state.near.account || {}
    },

    saveUri () {
      let href = 'data:attachment/text,'

      const uri = this.linkdrops
        .map(({ link, text }, index) => `${index}: ${text ? `${text} : ` : ''} \n${link}`)
        .join('\n\n\n')
      href += encodeURI(uri)

      return href
    }
  },
  watch: {
    links (newVal) {
      this.linkdrops = newVal
    }
  },
  mounted () {
    console.log(this.links)
    this.linkdrops = this.links
  },
  methods: {
    handleCopy (link) {
      const el = document.createElement('textarea')
      el.value = link
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.$message.success('复制成功')
    },
    handleSave () {
      let href = 'data:attachment/text,'

      const uri = this.linkdrops
        .map(({ link, text }, index) => `${index}: ${text ? `${text} : ` : ''} \n${link}`)
        .join('\n\n\n')
      href += encodeURI(uri)

      return href
    },
    handleBlur () {
      this.$store.commit('near/UPDATE_APP', {
        ...this.app,
        linkDropArray: this.linkdrops
      })
      localStorage.setItem(`linkDropArray:${this.account.accountId}`, JSON.stringify([...this.linkdrops]))
    }
  }
}
</script>
<style lang="less">
.share-gifts {
  background: url(../../../assets/banner.png) no-repeat top center;
  width: 100%;
  height: 571px;
  color: #fff;
  padding: 64px 45px;
  position: relative;
  margin-bottom: 60px;
  .h1 {
    width: 567px;
    font-weight: 500;
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 25px;
  }
  .total {
    position: absolute;
    bottom: 10px;
    left: 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    width: 530px;
  }
  .links {
    width: 650px;
    .tip {
      display: inline-block;
      width: 305px;
      padding-left: 25px;
      font-size: 9px;
    }
    &-item {
      display: flex;
      justify-content: flex-start;
      padding: 5px 0;
      align-items: center;

      .ant-input,
      .ant-input-affix-wrapper {
        width: 298px;
        height: 48px;
        font-size: 14px;
        color: #fff;
        border-radius: 10px;
        background: #efb437;
        margin-right: 10px;
        border: 1px solid #ffffff;
      }
    }
    .btn {
      width: 97px;
      height: 30px;
      float: right;
      margin-top: 10px;
      margin-right: 20px;
      line-height: 30px;
      border: 1px solid #ffffff;
      border-radius: 100px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
<style lang="less">
.mobile {
  .share-gifts {
    width: 100%;
    min-height: 235px;
    background: url(../../../assets/linkdrop_mb.png) no-repeat top center;
    background-size: 100% 100%;
    height: auto;
    padding: 20px 10px;
    margin-bottom: 30px;
    .h1 {
      font-size: 16px;
      width: 210px;
      line-height: 25px;
      margin-bottom: 15px;
    }
    .links {
      width: 100%;
      .tip{
        width: 50%;
      }
      .btn{
        position: absolute;
        right: 0;
        top: 10px;
        background: #CF9B2D;
        font-size: 12px;
        border: 1px solid #fff;
        color: #fff;
        width: 60px;
        height: 25px;
        line-height: 25px;
      }
    }
    .links-item {
      flex-wrap: wrap;
      .ant-input-affix-wrapper {
        width: 50%;
        height: 25px;
        border: 0;
        border-radius: 5px;
        .ant-input{
          width: 100%;
          height: 25px;
          border-radius: 5px;
          font-size: 9px;
          padding-left: 5px;
        }
      }
      & > .ant-input {
        width: 50%;
        height: 25px;
        margin-left: 24px;
        margin-top: 5px;
        border-radius: 5px;
        font-size: 9px;
        padding-left: 5px;
        padding-right: 2px;
      }
      .anticon-copy{
        color: #D49101;
        text-shadow:0 0 2px #fff;
      }
    }
  }
  .total{
   width: 130px;
   position: absolute;
   right: 10px;
   bottom: -10px;
   left: auto;
   .share-links{
     a{
       margin-bottom: 10px;
     }
   }

  }
}
</style>
