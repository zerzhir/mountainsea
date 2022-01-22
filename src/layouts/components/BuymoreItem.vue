<template>
  <div class="buymore-item">
    <div class="h2" @click="handleBuy">{{ title }}</div>
    <span v-if="isLinkdrop">Share a mystery NFT  for your friend</span>
    <div class="one">
      <div :class="{ round: true, active: count === 1 }" @click="handleCount(1)">1</div>
      <div class="line"></div>
      <img src="../../assets/n.png" alt="" />
      <div class="num">{{ formatPrice(price.oneNFT) }}</div>
    </div>
    <div class="ten" v-if="!isLinkdrop">
      <div :class="{ round: true, active: count === 10 }" @click="handleCount(10)">10</div>
      <div class="line"></div>
      <img src="../../assets/n.png" alt="" />
      <div class="num">{{ formatPrice(price.manyNFTS) }}</div>
    </div>
  </div>
</template>
<script>
import { formatPrice } from '@/utils/filters'
import { generate as id } from 'shortid'
import { KeyPairEd25519 } from 'near-api-js/lib/utils'
import getConfig from '../../..//config/near.config'
const { walletUrl, linkGAS, oneGAS, tenGAS } = getConfig()
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    isLinkdrop: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      count: 0,
      walletUrl
    }
  },
  computed: {
    contract () {
      return this.$store.state.near.contract
    },
    price () {
      return this.$store.state.near.price
    },
    account () {
      return this.$store.state.near.account || {}
    },
    wallet () {
      return this.$store.state.near.wallet || {}
    },
    app () {
      return this.$store.state.near.app || {}
    }
  },
  methods: {
    formatPrice,
    handleCount (count) {
      this.count = count
    },
    handleBuy () {
      if (!this.wallet.signedIn) {
        const successUrl = `${window.location.origin}`
        this.wallet.signIn(successUrl)
        return
      }
      if (!this.count) {
        this.$message.warning('Please select quantity')
        return
      }
      if (!this.isLinkdrop) {
        this.handleBuyNft()
      } else {
        this.handleLinkdrop()
      }
    },
    handleBuyNft () {
      const callbackUrl = `${window.location.origin}/nfts`
      if (this.count === 1) {
        this.contract.nft_mint_one({
          args: {},
          gas: oneGAS,
          amount: this.price.oneTokenCost,
          callbackUrl
        })
      } else {
        this.contract.nft_mint_many({
          args: { num: this.count },
          gas: tenGAS,
          amount: this.price.tenTokenCost,
          callbackUrl
        })
      }
    },
    async handleLinkdrop () {
      const walletUrl = (contractId, key, url) => {
        return `${this.walletUrl}/linkdrop/${contractId}/${key}?redirectUrl=${url}/nfts`
      }

      const keyPair = KeyPairEd25519.fromRandom()
      const currentUrl = window.location.origin
      const url = walletUrl(this.contract.contractId, keyPair.secretKey.toString(), currentUrl)

      const { linkDropArray } = this.app

      localStorage.setItem(
        `linkDropArray:${this.account.accountId}`,
        JSON.stringify([
          ...linkDropArray,
          {
            link: url,
            text: '',
            id: id(),
            isUsed: false
          }
        ])
      )

      const cost = this.price.costLinkDrop

      const publicKey = keyPair.getPublicKey().toString()

      try {
        await this.contract.create_linkdrop({
          args: { public_key: publicKey },
          gas: linkGAS,
          amount: cost,
          callbackUrl: `${currentUrl}/linkdrop`
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
