<template>
  <div>
    <template v-if="data.length">
      <a-timeline v-bind="extra.options">
        <a-timeline-item v-for="(item, index) in data" :key="index" :color="item.extra && item.extra.color">
          <p v-html="item.value" @click="item.click" style="cursor: pointer;"></p>
        </a-timeline-item>
      </a-timeline>
    </template>
    <template v-else>
      <a-timeline v-bind="extra.options">
        <a-timeline-item><p></p></a-timeline-item>
        <a-timeline-item><p></p></a-timeline-item>
      </a-timeline>
      <p style="text-align: center;margin-top:-40px">暂无数据</p>
    </template>
  </div>
</template>
<script>
/*
props: {
	    type: 'list',//list、table...
		extra:{
			grid:{}
		},
		loading: false,
	    data:[{
        key:'',
        value:'',
        extra:{
          tag:{},
          link:{},
          click:(item)=>{

          }
        }
      } */
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    extra: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    colors () {
      return this.$store.state.setting.colors
    }
  },
  methods: {},
  mounted () {}
}
</script>
<style></style>
