<template>
  <a-list :dataSource="listData" :grid="extra.grid || {}" :loading="loading" v-bind="options">
    <a-list-item slot="renderItem" slot-scope="item" style="line-height:40px">
      <a-col :span="labelWidth"> {{ item.key }}： </a-col>
      <a-col :span="24 - labelWidth">
        <template v-if="$lodash.isArray(item.value) && item.type === 'tag'">
          <template v-for="(itm, idx) in item.value">
            <a-tag :color="colors[idx]" v-on="item.extra" :key="idx" v-if="$lodash.isPlainObject(itm)">{{
              itm[item.enum]
            }}</a-tag>
            <a-tag :color="colors[idx]" v-on="item.extra" :key="idx" v-else>{{ item.enum[itm] || '-' }}</a-tag>
          </template>
        </template>
        <template v-else-if="item.value && item.type === 'tag'">
          <a-tag :color="colors[item.value['value']]" style="display:inline" v-on="item.extra">{{
            item.value['text'] || '-'
          }}</a-tag>
        </template>
        <template v-else-if="item.value && item.type === 'link'">
          <a class="link" @click="handleGoto(item.value['link'])">{{ item.value['value'] }}</a>
        </template>
        <template v-else-if="item.value && item.type === 'image'">
          <z-image v-for="(itm, idx) in item.value.split(',')" :key="idx" :url="itm | fileUrl" />
        </template>
        <template v-else-if="item.value && item.type === 'icon'">
          <a-icon :type="item.value" />
        </template>
        <template v-else>
          {{ item.value || '无' }}
        </template>
      </a-col>
    </a-list-item>
  </a-list>
</template>
<script>
import { datetime, fileUrl } from '@/utils/filters'
import ZImage from '@/components/Image'
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
  components: {
    ZImage
  },
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
    labelWidth: {
      type: Number,
      default: 5
    },
    extra: {
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
  data () {
    return {}
  },
  filters: {
    fileUrl
  },
  computed: {
    colors () {
      return this.$store.state.app.colors
    },
    enums () {
      return this.$store.state.base.enums
    },
    listData () {
      const data = this.$lodash.cloneDeep(this.data)

      data.forEach(item => {
        if (item.type === 'tag' && item.enum) {
          if (!this.$lodash.isArray(item.value)) {
            const enumItem = this.enums[item.enum]
            console.log(item)
            item.value = {
              value: item.value,
              text: enumItem[item.value]
            }
          } else {
            if (!this.$lodash.isPlainObject(item.value[0])) {
              item.enum = this.enums[item.enum]
            }
          }
        }
        if (item.type === 'time') {
          item.value = datetime(item.value, item.format)
        }
      })
      return data
    }
  },
  methods: {
    handleGoto (link) {
      this.$router
        .push({
          path: link.path,
          query: link.query
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {}
}
</script>
<style></style>
