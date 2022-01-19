<template>
  <div :class="['wrapper', isMobile && 'mobile']">
    <a-row class="row row-header">
      <div class="container header">
        <div class="logo" @click="linkHome" />
        <div class="menu" v-if="!isMobile">
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
          <a href="https://discord.gg/cMeSWKQ66p" target="blank">
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
          <template v-if="!isMobile">
            <!-- <a-icon
            type="bell"
            theme="filled"
            :style="{
              color: '#D49101',
              fontSize: '23px'
            }"
          /> -->
            <!-- <a-tooltip
            placement="topLeft"
            title="Log Out"
            v-if="account.accountId"
          ><a-button type="primary" @click="handleSignout">{{ account.accountId }} </a-button></a-tooltip
          > -->
            <!-- <a-button type="primary" @click="handleSignin" v-else>Connect Wallet</a-button> -->
            <a href="https://wallet.near.org" target="_blank"><a-button type="primary">Register NEAR Wallet</a-button></a>
          </template>
          <a-icon
            type="bars"
            :style="{
              color: '#D49101',
              fontSize: '26px',
              marginTop: '-6px'
            }"
            @click="toggleDrawer"
            v-if="isMobile"
          />
        </div>
      </div>
      <a-drawer :visible="showDrawer" placement="right" @close="toggleDrawer">
        <div class="menu menu-drawer">
          <a-anchor :affix="false" :showInkInFixed="false">
            <template v-for="(item, index) in menuList">
              <a-anchor-link
                :key="index"
                :href="item.path"
                :title="item.name"
                v-if="(item.is_login && wallet.signedIn) || !item.is_login"
              />
            </template>
          </a-anchor>
          <!-- <a-tooltip
            placement="topLeft"
            title="Log Out"
            v-if="account.accountId"
          ><a-button type="primary" @click="handleSignout">{{ account.accountId }} </a-button></a-tooltip
          > -->
          <!-- <a-button type="primary" @click="handleSignin" v-else>Connect Wallet</a-button> -->
          <a href="https://wallet.near.org" target="_blank"><a-button type="primary">Register NEAR Wallet</a-button></a>
        </div>
      </a-drawer>
    </a-row>
    <div :style="isMobile?'':'min-height: 600px'">
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
      showDrawer: false,
      menuList: [
        {
          name: 'Details',
          path: '/index#detail'
        },
        {
          name: 'Rarity',
          path: '/index#level'
        },
        {
          name: 'Generate',
          path: '/index#right'
        },
        {
          name: 'FAQ',
          path: '/index#faq'
        },
        {
          name: 'My NFTs',
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
    toggleDrawer () {
      this.showDrawer = !this.showDrawer
    },
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
<style lang="less">
.mobile {
  .row-header{
    padding-top: 15px;
    margin-bottom: 15px;
  }
  .header {
    height: 45px;
    line-height: 45px;
    margin-top: 0;
    .logo {
      height: 35px;
      width: 130px;
      background-size: contain;
    }
  }
}
.menu-drawer {
  padding: 20px 0;
  .ant-anchor-wrapper {
    background: none;
    a {
      font-size: 16px;
      color: #d59101;
      padding: 0 20px;
      font-weight: 600;
      text-align: left;
      display: inline-block;
      width: 100%;
    }
    .ant-anchor {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
    .ant-anchor-ink {
      display: none;
    }
    .ant-anchor-link {
      width: 100%;
      line-height: 35px;
    }
  }
  .ant-btn {
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    font-weight: 700;
    margin-left: 20px;
    margin: 0;
  }
}
</style>
