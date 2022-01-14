<template>
  <div :class="['wrapper', isMobile && 'mobile']">
    <a-row class="row row-header">
      <div class="container header">
        <div class="logo" @click="linkHome" />
        <div class="menu">
          <a-anchor :affix="false">
            <template v-for="(item, index) in menuList">
              <a-anchor-link
                :key="index"
                :href="item.path"
                :title="item.name"
                v-if="(item.is_login && wallet.signedIn) || !item.is_login"
              />
            </template>
          </a-anchor>
        </div>
        <div class="search">
          <a href="https://discord.gg/TVY2MapTxV" target="blank">
            <z-icon
              type="icon-discord"
              :style="{
                color: '#D49101',
                fontSize: '24px'
              }"
            />
          </a>
          <a href="https://twitter.com/Mountainsea_nft" target="blank">
            <a-icon
              type="twitter"
              :style="{
                color: '#D49101',
                fontSize: '27px'
              }"
            />
          </a>

          <!-- <a-icon
            type="bell"
            theme="filled"
            :style="{
              color: '#D49101',
              fontSize: '23px'
            }"
          /> -->
          <a-tooltip
            placement="topLeft"
            title="点击退出"
            v-if="account.accountId"
          ><a-button type="primary" @click="handleSignout">{{ account.accountId }} </a-button></a-tooltip
          >
          <a-button type="primary" @click="handleSignin" v-else>Connect Wallet</a-button>
        </div>
      </div>
    </a-row>
    <div style="min-height: 600px">
      <router-view />
    </div>
    <buymore v-if="$route.name !== 'Index'" />
    <z-footer />
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'
import { fileUrl } from '@/utils/filters'
import ZFooter from './components/Footer'
import Buymore from './components/Buymore'
export default {
  name: 'PortalLayout',
  components: {
    ZFooter,
    Buymore
  },
  mixins: [deviceMixin],
  data () {
    return {
      menuList: [
        {
          name: '详情',
          path: '/index#detail'
        },
        {
          name: '稀有度',
          path: '/index#level'
        },
        {
          name: '权益',
          path: '/index#right'
        },
        {
          name: 'FAQ',
          path: '/index#faq'
        },
        {
          name: '我的NFT',
          path: '/nfts',
          is_login: true
        },
        {
          name: 'Linkdrop',
          path: '/linkdrop',
          is_login: true
        }
      ]
    }
  },
  computed: {
    account () {
      return this.$store.state.near.account || {}
    },
    wallet () {
      return this.$store.state.near.wallet || {}
    },
    configs () {
      return this.$store.state.base.configs || {}
    }
  },
  watch: {
    configs (newVal) {
      if (newVal && newVal.siteTitle) {
        document.title = newVal.siteTitle
        document.querySelector('meta[name="description"]').setAttribute('content', newVal.siteDescription)
      }
    }
  },
  mounted () {
    console.log(this.$route)
    if (this.$route.hash) {
      document.querySelector(this.$route.hash).scrollIntoView(true)
    }
    this.$store.dispatch('near/handleInit')
  },
  methods: {
    fileUrl,
    linkHome () {
      this.$router.push('/')
    },
    handleSignin () {
      console.log(this.wallet)
      this.wallet.signIn()
    },
    handleSignout () {
      this.account.accountId && this.wallet.signOut()
    }
  }
}
</script>
<style lang="less">
.row {
  .container {
    margin: 0 auto;
    width: 1200px;
  }
  &-header {
    padding-top: 30px;
    margin-bottom: 25px;
  }
  &-footer {
    background: #d49101;
  }
}

.header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 97px;
  line-height: 97px;
  border-bottom: 1px solid #c7c7c7;
  .logo {
    width: 180px;
    height: 86px;
    background: url(../assets/logo.png) no-repeat left center;
    background-size: 180px auto;
    cursor: pointer;
  }
  .ant-anchor-wrapper {
    background: none;
    a {
      font-size: 16px;
      color: #d59101;
      padding: 0 20px;
      font-weight: 600;
    }
    .ant-anchor {
      display: flex;
      justify-content: flex-start;
    }
  }
  .search {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    .anticon {
      margin-left: 30px;
    }
    .anticon-bell {
      width: 45px;
      height: 45px;
      text-align: center;
      line-height: 45px;
      background: #e3e3e3;
      border: 1px solid #d49101;
    }
    .ant-btn {
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      font-weight: 700;
      margin-left: 20px;
    }
  }
}
</style>
