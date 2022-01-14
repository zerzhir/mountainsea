<template>
  <a-drawer
    :title="title"
    v-bind="drawer"
    :width="width"
    @close="onDetailClose"
    :visible="show"
  ><z-detail
    v-bind="options"
  /></a-drawer>
</template>

<script>
/*
  options:{
    title:'',
    width:'',
    btnAt:'',
    items:[{
      component: 'list',//list,table...
      data:[],
      title:'',
      extra:{}
    }]
  }
  */
import ZDetail from '@/components/Detail/Detail'
export default {
  components: {
    ZDetail
  },
  data () {
    return {}
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    drawer: {
      type: Object,
      default () {
        return {}
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    title () {
      return this.options.title || '����'
    },
    width () {
      return this.options.width || '800'
    }
  },
  mounted () {},
  methods: {
    onDetailClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped></style>
