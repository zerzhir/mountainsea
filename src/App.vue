<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'
import { deviceMixin } from '@/store/device-mixin'
import enquireScreen from '@/utils/device'
import { TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'
export default {
  mixins: [deviceMixin],
  data () {
    return {}
  },
  computed: {
    locale () {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && setDocumentTitle(`${i18nRender(title)} - ${domTitle}`)

      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  },
  created () {
    this.$message.config({
      top: '200px',
      duration: 2,
      maxCount: 1
    })
    enquireScreen(isMobile => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, isMobile)
    })
  }
}
</script>
<style lang="less">
[v-cloak] {
  display: none;
}
.mobile {
  .row {
    .container {
      width: 100%;
      padding: 0 10px;
    }
  }
  .title{
    font-size: 25px;
    line-height: 40px;
  }
}
</style>
