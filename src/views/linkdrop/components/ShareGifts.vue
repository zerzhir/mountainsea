<template>
  <div class="row">
    <div class="container">
      <div class="share-gifts">
        <div class="h1">
          选择一个NFT盲盒礼品链接分享给好友
        </div>
        <div class="links">
          <div class="tip">Shareable links</div>
          <div class="tip">Who did I share this link with?</div>
          <a-radio-group v-model="linkIndex">
            <div class="links-item" v-for="(item, index) in linkdrops" :key="item.id">
              <a-radio :value="index" />
              <a-input :value="item.link">
                <a-icon type="copy" slot="suffix" theme="filled" @click="handleCopy(item.link)" />
              </a-input>
              <a-input v-model="item.text" @blur="handleBlur" />
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
export default {
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
    font-size: 46px;
    line-height: 67px;
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
    height: auto;
    padding: 20px;
    .h1 {
      font-size: 30px;
      width: 100%;
      line-height: 45px;
    }
    .links {
      width: 100%;
      .tip{
        width: 50%;
      }
    }
    .links-item {
      .ant-input-affix-wrapper {
        width: 47%;
        height: 48px;
        .ant-input{
          width: 100%;
        }
      }
      & > .ant-input {
        width: 40%;
      }
    }
  }
  .total{
    width: 100%;
    position: relative;
    bottom: 0;
  }
}
</style>
