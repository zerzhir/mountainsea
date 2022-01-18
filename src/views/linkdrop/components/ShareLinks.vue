<template>
  <div class="share-links">
    <a href="https://twitter.com/Mountainsea_nft" @click="handleCopy"><img src="../../../assets/share1.png" alt=""/></a>
    <a href="https://t.me/shanhaijingmeta" @click="handleCopy"><img src="../../../assets/share7.png" alt=""/></a>
    <a href="https://discord.gg/cMeSWKQ66p" @click="handleCopy"><img src="../../../assets/share8.png" alt=""/></a>
    <a href="" @click="handleCopy"><img src="../../../assets/share2.png" alt=""/></a>
    <a href="" @click="handleCopy"><img src="../../../assets/share3.png" alt=""/></a>
    <a href="" @click="handleCopy"><img src="../../../assets/share4.png" alt=""/></a>
    <a href="" @click="handleCopy"><img src="../../../assets/share5.png" alt=""/></a>
    <a href="" @click="handleCopy"><img src="../../../assets/share6.png" alt=""/></a>
  </div>
</template>
<script>
export default {
  props: {
    linkdrop: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleCopy () {
      const link = this.linkdrop.link
      const el = document.createElement('textarea')
      el.value = link
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  }
}
</script>
<style lang="less">
.share-links {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  padding: 26px 0 15px;
}
</style>
