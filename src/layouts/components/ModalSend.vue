<template>
  <a-modal v-model="showSend" title="发送NFT" @ok="handleSend">
    <a-card>
      <a-form-model ref="form" :rules="rules" :model="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-model-item prop="nft" label="NFT">
          <a-input v-model="form.nft" placeholder="请输入NFT Token ID" size="large" />
        </a-form-model-item>
        <a-form-model-item prop="account" label="接收账户">
          <a-input v-model="form.account" placeholder="请输入接收账户" size="large" />
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
            message: '请输入发送的NFT Token ID'
          }
        ],
        account: [
          {
            required: true,
            message: '请输入接收账户'
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
            this.$message.warning('Token ID 无效')
            return
          }

          if (this.form.account === this.account.accountId || !this.form.account.includes('.near')) {
            this.$message.warning('请输入接收方Near钱包账号')
            return
          }
          const loading = this.$message.loading('请稍后', 0)

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
        args: { receiverId, token },
        amount: '1'
      })
      this.$router.push('/nfts')
    }
  }
}
</script>
<style lang="less"></style>
