<template>
  <a-modal v-model="showSend" title="Send NFT" @ok="handleSend" okText="Confirm" cancelText="Cancel">
    <a-card>
      <a-form-model ref="form" :rules="rules" :model="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-model-item prop="nft" label="NFT">
          <a-input v-model="form.nft" placeholder="Please enter NFT Token ID" size="large" />
        </a-form-model-item>
        <a-form-model-item prop="account" label="Account">
          <a-input v-model="form.account" placeholder="Please enter the receiving account" size="large" />
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </a-modal>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      showSend: false,
      form: {
        nft: undefined,
        account: ''
      },
      rules: {
        nft: [
          {
            required: true,
            message: 'Please enter NFT Token ID'
          }
        ],
        account: [
          {
            required: true,
            message: 'Please enter the receiving account'
          }
        ]
      }
    }
  },
  computed: {
    app () {
      return this.$store.state.near.app || {}
    },
    contract () {
      return this.$store.state.near.contract || {}
    },
    account () {
      return this.$store.state.near.account || {}
    },
    nftsList () {
      return this.app.misfitsArray
    }
  },
  methods: {
    toggleModal () {
      this.showSend = !this.showSend
    },
    async handleSend () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (!this.form.nft || !this.app.misfitsArray.some(item => item.token_id === this.form.nft)) {
            this.$message.warning('Token ID invalid')
            return
          }

          if (this.form.account === this.account.accountId) {
            this.$message.warning('Can not send to yourself')
            return
          }
          if (!this.form.account.includes('.near')) {
            this.$message.warning('Please enter the receiving NEAR account')
            return
          }
          const loading = this.$message.loading('Please wait', 0)

          try {
            await this.handleTransfer(this.form.nft, this.form.account)
          } finally {
            loading()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async handleTransfer (tokenId, receiverId) {
      const token = tokenId.toString()
      await this.contract.nft_transfer({
        args: { receiver_id: receiverId, token_id: token },
        amount: '1'
      })
      this.$router.push('/nfts')
    }
  }
}
</script>
<style lang="less"></style>
