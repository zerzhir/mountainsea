<template>
  <div class="row">
    <div class="container">
      <div class="nfts">
        <nft-item
          v-for="(item, index) in nftsList"
          :key="index"
          :item="item.metadata"
          :token-id="item.token_id"
          :is-reveal="app.revealMisfits[item.token_id]"
        />
      </div>
    </div>
  </div>
</template>
<script>
import NftItem from './components/NftItem'
export default {
  components: {
    NftItem
  },
  computed: {
    app () {
      return this.$store.state.near.app || {}
    },
    nftsList () {
      return this.app.misfitsArray
    }
  },
  created () {
    if (!localStorage.undefined_wallet_auth_key) {
      this.$message.warning('请先连接钱包')
      this.$router.push('/')
    }
  }
}
</script>
