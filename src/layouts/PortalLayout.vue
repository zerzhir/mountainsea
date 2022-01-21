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
          <template v-if="!isMobile">
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
              title="Log Out"
              v-if="account.accountId"
            ><a-button type="primary" @click="handleSignout">{{ account.accountId }} </a-button></a-tooltip
            >
            <a-button type="primary" @click="handleSignin" v-else>Connect Wallet</a-button>
            <!-- <a
              href="https://wallet.near.org"
              target="_blank"
            ><a-button type="primary">Register NEAR Wallet</a-button></a
            > -->
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
      <a-drawer :visible="showDrawer" placement="right" @close="toggleDrawer" :closable="false" :width="280">
        <div class="menu menu-drawer">
          <div class="menu-head">
            <a-icon
              type="bars"
              @click="toggleDrawer"
              :style="{
                color: '#000000',
                fontSize: '24px',
                fontWeight: '700'
              }"
            />
            <a-tooltip
              placement="topLeft"
              title="Log Out"
              v-if="account.accountId"
            ><a-button type="primary" @click="handleSignout">{{ account.accountId }} </a-button></a-tooltip
            >
            <a-button type="primary" @click="handleSignin" v-else>Connect Wallet</a-button>
            <!-- <a
              href="https://wallet.near.org"
              target="_blank"
            ><a-button type="primary">Register NEAR Wallet</a-button></a
            > -->
          </div>
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
          <div class="menu-foot">
            <a href="https://discord.gg/cMeSWKQ66p" target="blank">
              <z-icon
                type="icon-discord"
                :style="{
                  color: '#5865F2',
                  fontSize: '24px'
                }"
              />
            </a>
            <a href="https://twitter.com/Mountainsea_nft" target="blank">
              <a-icon
                type="twitter"
                :style="{
                  color: '#1DA1F2',
                  fontSize: '27px'
                }"
              />
            </a>
          </div>
        </div>
      </a-drawer>
    </a-row>
    <div :style="isMobile ? '' : 'min-height: 600px'">
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
      try {
        this.wallet.signIn()
      } catch (err) {
        console.log(err)
        this.$message.warning('Please wait for sale !')
      }
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
  .row-header {
    padding-top: 10px;
    margin-bottom: 15px;
  }
  .header {
    height: 45px;
    line-height: 45px;
    margin-top: -5px;
    .logo {
      height: 35px;
      width: 130px;
      background-size: contain;
      margin: 0 auto;
    }
  }
}
.menu-drawer {
  padding: 0;
  overflow: hidden;
  margin: 0 -24px;
  .ant-anchor-wrapper {
    background: none;
    padding-top: 20px;
    border-top: 1px solid #d8d9e8;
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
      height: 49px;

      a {
        color: #3f4246;
      }
    }
    .ant-anchor-link-active {
      background: #f4f4f4;
      a {
        color: #d59101;
      }
    }
  }
  .ant-btn {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    font-weight: 700;
    margin-left: 20px;
    margin: 0;
  }
  .menu-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 20px;
  }
  .menu-foot {
    text-align: center;
    position: absolute;
    bottom: 40px;
    width: 100%;
    .anticon {
      margin: 0 15px;
      width: 52px;
      height: 52px;
      line-height: 62px;
      background: #ffffff;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
      border-radius: 100%;
    }
  }
}
</style>
