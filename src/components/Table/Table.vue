<template>
  <a-row>
    <template v-if="searchForm.items">
      <template v-if="searchAt === 'top'">
        <z-form :grid="grid" :initShow="initShow" :values="searchValues" @submit="handleSubmit" v-bind="searchForm">
          <template #btnLeft>
            <a-divider :dashed="true" class="divider-table-search" v-if="searchForm.showSplit"/>
            <div class="operator operator-top">
              <div :key="index" v-for="(item, index) in handleBtns">
                <a-button
                  :loading="item.loading"
                  :type="item.type"
                  @click="item.click"
                  v-hasPermission="item.permission"
                >{{ item.title }}</a-button
                >
              </div>
              <a-button @click="handleRefresh" v-if="showRefresh">刷新</a-button>
            </div>
          </template>
        </z-form>
        <!-- <a-divider class="small"/> -->
      </template>
      <template v-else>
        <z-form-drawer
          :options="searchForm"
          :show="showSearch"
          :values="searchValues"
          @close="toggleSearch"
          @submit="handleSubmit"
        />
        <div class="operator">
          <div :key="index" v-for="(item, index) in handleBtns">
            <a-button :loading="item.loading" :type="item.type" @click="item.click" v-hasPermission="item.permission">{{
              item.title
            }}</a-button>
          </div>
          <a-button @click="handleRefresh" v-if="showRefresh">刷新</a-button>
          <a-button
            @click="toggleSearch"
            class="right"
            type="primary"
            v-if="searchForm.items.length && searchAt === 'drawer'"
          >筛选</a-button
          >
        </div>
      </template>
    </template>

    <a-table
      :bordered="border"
      :columns="newColumns"
      :dataSource="newDataSource"
      :pagination="newPagination"
      :rowKey="record => record[rowKey]"
      :rowSelection="newRowSelection"
      :size="size"
      @change="onTableChange"
      v-bind="otherOptions"
    >
      <template #handle="text, record">
        <div style="white-space: nowrap;">
          <span :key="index" v-for="(item, index) in tableBtns" v-hasPermission="item.permission">
            <template v-if="item.condition">
              <template v-if="item.condition.value.indexOf($lodash.get(record, item.condition.field)) > -1">
                <template v-if="item.icon">
                  <a-icon :title="item.title" :type="item.icon" @click="item.click(record)" />
                </template>
                <template v-else>
                  <a :title="item.title" @click="item.click(record)">{{ item.title }}</a>
                </template>
                <a-divider type="vertical" v-show="funcDivider(tableBtns, index, record, statusField)" />
              </template>
            </template>
            <template v-else>
              <template v-if="item.icon">
                <a-icon :title="item.title" :type="item.icon" @click="item.click(record)" />
              </template>
              <template v-else>
                <a :title="item.title" @click="item.click(record)">{{ item.title }}</a>
              </template>
              <!-- <a-divider type="vertical" v-show="tableBtns.length > index + 1" /> -->
              <a-divider type="vertical" v-show="funcDivider(tableBtns, index, record, statusField)" />
            </template>
          </span>
        </div>
      </template>
    </a-table>
    <div :style="{ borderColor: primaryColor }" @click="handleMore" class="btn-more" v-if="showMore">
      <a-tooltip placement="topLeft" title="加载更多">
        <a-icon :style="{ fontSize: '20px', color: primaryColor }" type="ellipsis" />
      </a-tooltip>
    </div>
  </a-row>
</template>
<script>
/*
 props:{
   searchForm:{}
   searchValues: {},
   showKey: true,
   rowKey: 'id'
   initFetch: false,
   handleBtns:[
     {
       title:'新增',
       type:'',
       permission:'',
       click:()=>{

       }
     }
   ],
   tableBtns:[{
     title:'修改',
     icon:'',
     permission:''
     click:()=>{}

   }],
   columns:[{
     title: "xxx",
     dataIndex: "xxx",
     width: 150,
     //fixed: "right",
	 extra:{
		 tag:{
		 		color:''
		 },
		 tooltip:{
		 		width:''
		 },
		 link:{
		 		path:'',
				query:''
		 },
	 },
     scopedSlots: {
       customRender: "handle"
     }
   }],
   pagination:{},
   dataSource:[],
   rowSelection:{

   },
   otherOptions:{

   }

 }
 */
import ZFormDrawer from '@/components/Form/FormDrawer'
import ZForm from '@/components/Form/Form'
import moment from 'moment'
const table = {
  searchAt: 'drawer',
  initShow: 3,
  grid: 3,
  border: false,
  size: 'middle'
}
export default {
  name: 'BTable',
  components: {
    ZFormDrawer,
    ZForm
  },
  props: {
    searchAt: {
      type: String,
      default () {
        return table.searchAt || 'drawer'
      } // drawer,top侧边弹出，显示在表格上
    },
    showRefresh: {
      type: Boolean,
      default: true
    },
    showMore: {
      type: Boolean,
      default: false
    },
    showKey: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    initFetch: {
      type: Boolean,
      default: true
    },
    statusField: {
      type: String,
      default: 'status'
    },
    handleBtns: {
      type: Array,
      default () {
        return []
      }
    },
    handleName: {
      type: String,
      default: '操作'
    },
    tagColors: {
      type: Array,
      default () {
        return []
      }
    },
    tableBtns: {
      type: [Array, Boolean],
      default () {
        return false
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    pagination: {
      type: [Object, Boolean],
      default () {
        return false
      }
    },
    dataSource: {
      type: Array,
      default () {
        return []
      }
    },
    rowSelection: {
      type: [Object, Boolean],
      default () {
        return false
      }
    },
    otherOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    searchForm: {
      type: Object,
      default () {
        return {}
      }
    },
    searchValues: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      initShow: table.initShow || 0,
      grid: table.grid || 3,
      border: !!table.border,
      // size: table.size,
      formValues: {},
      showSearch: false,
      pages: {
        current: 1
      },
      selectedRows: []
    }
  },

  computed: {
    size () {
      return this.otherOptions.size || table.size
    },
    primaryColor () {
      return this.$store.state.setting.color
    },
    enums () {
      return this.$store.state.base.enums
    },
    colors () {
      return (this.tagColors.length && this.tagColors) || this.$store.state.app.colors
    },
    newPagination () {
      if (!this.pagination) {
        return false
      }
      const pagination = {
        current: 1,
        pageSize: 10,
        total: 0,
        // pageSizeOptions: ['10', '20', '30', '50', '100'],
        // showQuickJumper: true,
        // showSizeChanger: true,
        showTotal: (total, range) => {
          return `共 ${total}条记录 第 ${range[0]} - ${range[1]} 条`
        }
      }
      return this.$lodash.merge(pagination, this.pagination, this.pages)
    },
    newColumns () {
      const columns = this.$lodash.cloneDeep(this.columns)
      columns.forEach(item => {
        if (this.$lodash.has(item, 'extra.tag')) {
          item.customRender = (text, record, index) => {
            const tag = item.extra.tag
            console.log(this.enums)
            const enumItem = tag.data || this.enums[tag.code]

            if (!enumItem) {
              return
            }
            if (text) {
              return this.$createElement(
                'a-tag',
                {
                  attrs: {
                    color: this.colors[text]
                  }
                },
                enumItem[text]
              )
            }
            return this.$createElement('span', {}, '-')
          }
        }
        if (this.$lodash.has(item, 'extra.icon')) {
          item.customRender = (text, record, index) => {
            if (!text) {
              return
            }
            return this.$createElement('a-icon', {
              attrs: {
                type: text
              }
            })
          }
        }
        if (this.$lodash.has(item, 'extra.avatar')) {
          item.customRender = (text, record, index) => {
            if (!text) {
              return
            }
            return this.$createElement('a-avatar', {
              attrs: {
                src: text,
                ...item.extra.avatar
              },
              on: {
                click: () => {
                  item.extra.click(record)
                }
              }
            })
          }
        }

        if (this.$lodash.has(item, 'extra.time')) {
          item.customRender = (text, record, index) => {
            if (!text) {
              return
            }

            // text = text - 8*60*60*1000
            return this.$createElement('span', {}, moment(text).format(item.extra.time.format || 'YYYY-MM-DD HH:mm:ss'))
          }
        }
        if (this.$lodash.has(item, 'extra.tooltip')) {
          item.customRender = (text, record, index) => {
            const tooltip = item.extra.tooltip
            let width = tooltip.width || ''
            if (width.indexOf('%') >= 0) {
              width = width.slice(0, -1) + 'vw'
            }
            return this.$createElement('a-tooltip', {
              attrs: {
                title: text,
                overlayStyle: { fontSize: '12px' }
              },
              domProps: {
                innerHTML: `<div class="overflow" style="width: ${width}">${text}</div>`
              }
            })
          }
        }

        if (this.$lodash.has(item, 'extra.link')) {
          item.customRender = (text, record, index) => {
            const link = item.extra.link
            const self = this
            if (link.condition) {
              if (!link.condition(record)) {
                return this.$createElement('span', {}, text)
              }
            }
            const key = link.key || 'id'
            return this.$createElement(
              'a',
              {
                attrs: {
                  class: 'link'
                },
                on: {
                  click: () => {
                    if (link.path) {
                      self.$router
                        .push({
                          path: link.path,
                          query: {
                            id: record[key]
                          }
                        })
                        .catch(err => {
                          console.log(err)
                        })
                    } else {
                      link.click(record)
                    }
                  }
                }
              },
              text
            )
          }
        }
      })
      if (this.showKey) {
        columns.unshift({
          title: '序号',
          dataIndex: 'key',
          width: 80,
          align: 'center'
        })
      }
      if (this.tableBtns) {
        columns.push({
          title: this.handleName || '操作',
          dataIndex: 'handle',
          // fixed: 'right',
          // width: 80 * this.tableBtns.length,
          scopedSlots: {
            customRender: 'handle'
          }
        })
      }
      return columns
    },
    newRowSelection () {
      const self = this
      if (!this.rowSelection) {
        return null
      }

      const rowSelection = {
        fixed: false,
        onChange: (selectedKeys, selectedRows) => {
          const selectedRowsAll = []
          selectedKeys.forEach(item => {
            const rows = this.selectedRows.concat(selectedRows)
            selectedRowsAll.push(rows.filter(itm => itm[this.rowKey] === item)[0])
          })
          self.selectedRows = selectedRowsAll
          self.$emit('select', selectedKeys, selectedRowsAll)
        }
      }

      return this.$lodash.merge(rowSelection, this.rowSelection)
    },
    newDataSource () {
      const dataSource = this.dataSource || []
      if (this.showKey) {
        const pageNum = (this.newPagination && this.newPagination.current) || 1
        const pageSize = (this.newPagination && this.newPagination.pageSize) || 10
        dataSource.map((item, index) => {
          item.key = (pageNum - 1) * pageSize + index + 1
        })
      }
      return dataSource
    }
  },
  watch: {
    pagination (val) {
      if (val && val.reset) {
        // console.log(val,this.pages)
        this.pages.current = 1
      }
    }
  },
  created () {
    if (this.initFetch) {
      this.handleRefresh()
    }
  },
  methods: {
    handleMore () {
      this.$emit('fetch', {
        search: this.searchValues
      })
    },
    handleSubmit (values) {
      this.pages.current = 1
      const formValues = this.$lodash.cloneDeep(this.searchValues)
      this.formValues = Object.assign(formValues, values) // this.$lodash.merge(formValues, values)
      this.$emit('fetch', {
        pageSize: (this.newPagination && this.newPagination.pageSize) || 10,
        pageNum: 1,
        search: this.formValues
      })
    },
    handleRefresh () {
      this.pages.current = 1
      this.formValues = {}
      this.$emit('fetch', {
        pageSize: (this.newPagination && this.newPagination.pageSize) || 10,
        pageNum: 1,
        search: this.$lodash.merge({}, this.searchValues)
      })
    },
    toggleSearch () {
      this.showSearch = !this.showSearch
    },
    onTableChange (pagination, filters, sorter) {
      this.pages.current = pagination.current
      this.pages.pageSize = pagination.pageSize
      this.$emit('fetch', {
        pageSize: pagination.pageSize,
        pageNum: pagination.current,
        search: this.formValues,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    funcDivider (tableBtns, index, record, statusField) {
      const status = record[statusField]
      //  if(!record[statusField] && record[statusField] !== 0){
      //     status = record[statusField].value
      //  }

      const btns = tableBtns.filter(b => {
        return b.condition && b.condition.value.indexOf(status) > -1
      })
      let ix = 0
      const normalBtns = tableBtns.filter(item => {
        return !item.condition
      })
      btns.forEach((itm, idx) => {
        if (tableBtns[index].title === itm.title) {
          ix = index
        }
      })
      // if (ix === null) {
      //   return false
      // }

      if (ix + 1 < btns.length + normalBtns.length) {
        return true
      } else {
        return false
      }
    }
  },
  directives: {
    hasPermission: {
      bind (el, binding, vnode) {
        const permissions = vnode.context.$store.state.base.permissions
        if (!binding.value) {
          return
        }
        const value = binding.value.split(',')
        let flag = true
        for (const v of value) {
          if (!permissions.includes(v)) {
            flag = false
          }
        }
        if (!flag) {
          if (!el.parentNode) {
            el.style.display = 'none'
          } else {
            el.parentNode.removeChild(el)
          }
        }
      }
    }
  }
}
</script>
<style lang="less">
.divider-table-search {
  margin-top: 0;
}
.operator {
  margin-bottom: 25px;
  &.operator-top {
    float: left;
  }
  div {
    display: inline-block;
  }
  .right {
    float: right;
  }

  button {
    margin-left: 10px;
  }
}
.ant-table-pagination {
  width: 100%;
  text-align: right;
  .ant-pagination-total-text {
    float: left;
  }
}
.ant-table {
  .ant-table-header {
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .ant-table-thead {
    th {
      word-break: keep-all;
      div {
        line-height: 22px;
        min-height: 22px;
      }
    }
  }
  &-placeholder {
    border-bottom: 0;
  }
}
@-webkit-keyframes pulse {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes pulse {
  0% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
}
.btn-more {
  // float: right;
  width: 30px;
  height: 30px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  line-height: 30px;
  text-align: center;
  border: 2px solid;
  border-radius: 15px;
  background: #f5f5f5;
  cursor: pointer;
  &:hover {
    -webkit-animation-name: pulse;
    animation-name: pulse;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    animation-direction: alternate;
    -webkit-animation-direction: alternate;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
  }
}
</style>
