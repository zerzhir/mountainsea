<template>
  <div>
    <a-row :class="css">
      <slot name="header"></slot>
      <div v-for="(item, index) in itemsOptions" :key="index">
        <div class="h5" v-if="item.data.title">{{ item.data.title }}</div>
        <component :is="item.component" v-bind="item.data"></component>
      </div>
    </a-row>
    <div :class="'form-btns form-btns-' + btnAt" v-if="btnAt">
      <a-button class="ml-10" :type="item.type" @click="item.click" v-for="(item, index) in detailBtns" :key="index">{{
        item.title
      }}</a-button>
    </div>
  </div>
</template>
<script>
/*
	props:{
	  title:'',
	  width:'',
	  css:'',
	  btnAt:'',
	  items:[{
	    component: 'list',//list、table...
	    data:[{
        key:'',
        value:'',
        extra:{
          tag:{},
          link:{},
          click:(item)=>{

          }
        }
      }],
	    title:'',
	    extra:{
        grid:''
      }
	  }]

	*/
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    css: {
      type: String,
      default: ''
    },
    btnAt: {
      type: [String, Boolean],
      default: false
    },
    detailBtns: {
      type: Array,
      default () {
        return []
      }
    },
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    itemsOptions () {
      const itemsOptions = []
      const items = this.items || []
      items.forEach(item => {
        itemsOptions.push({
          component: () => import('@/components/Detail/items/' + this.$lodash.upperFirst(item.component)),
          data: { ...item, loading: this.loading }
        })
      })

      return itemsOptions
    }
  },
  mounted () {},
  watch: {},
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.form-btns {
  margin-top: 20px;
}
.h5 {
  line-height: 40px;
  font-size: 16px;
  color: #333;
  border-bottom: 1px dashed #eee;
  margin-bottom: 15px;
}
.private {
  //background: url('../../assets/img/lock.png') no-repeat right top;
  background-size: 30px 30px;
}
</style>
