<template>
  <div>
    <banner />
    <series />
    <issues />
    <themes />
    <why />
    <roadmap />
    <answers />
  </div>
</template>
<script>
import Banner from './components/Banner'
import Series from './components/Series'
import Issues from './components/Issues'
import Themes from './components/Themes'
import Why from './components/Why'
import Roadmap from './components/Roadmap'
import Answers from './components/Answers'
export default {
  components: {
    Banner,
    Series,
    Issues,
    Themes,
    Why,
    Roadmap,
    Answers
  }
}
</script>
<style lang="less">
.title {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 45px;
  line-height: 120px;
  color: #d49101;
  &-black {
    color: #3f4246;
    font-weight: 500;
  }
}
</style>
