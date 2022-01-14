<template>
  <a-form-item :label="label" v-bind="cols">
    <a-input v-bind="options" v-decorator="[name, { ...decorator }]" v-on="event">
      <a-icon type="search" slot="addonAfter" @click="toggleModal"></a-icon>
    </a-input>
    <a-modal v-model="showModal" @ok="handleOk" @cancel="handleCancel" v-bind="extra.modal">
      <z-table
        v-bind="extra.table"
        :searchForm="extra.searchForm"
        :searchValues="extra.searchValues"
        @fetch="extra.fetch"
        @select="onTableSelect"
      />
    </a-modal>
  </a-form-item>
</template>
<script>
/*
props: {
	component:'input',//表单类型，对应items里的组件
	extra:{
		modal: {},
		table: {},
		search:{}
	},//表单项的备用数据，例如单选多选的选项
	label: '表单项标题',
	hidden: boolean,//显示隐藏
	name: '表单项名称',
	options:{
		placeholder: '表单输入框提示文本',
		allowClear:true
		...其他表单支持的参数设置
	},//表单参数
	decorator:{
		...其他表单支持的decorator选项
		rules:[]//校验规则
	},//表单值相关选项
	event:{
		change:()=>{},
		...事件监听
	}}
*/
import ZTable from '@/components/Table/Table'
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    component: {
      type: String,
      default: 'input'
    },
    hidden: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    cols: {
      // 值会覆盖form的cols设置
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
    },
    decorator: {
      type: Object,
      default () {
        return {}
      }
    },
    event: {
      type: Object,
      default () {
        return {}
      }
    },
    extra: {
      type: Object,
      default () {
        return {
          modal: {},
          table: {},
          searchForm: {},
          searchValues: {}
        }
      }
    }
  },
  components: {
    ZTable
  },
  data () {
    return {
      showModal: false,
      selectedKeys: [],
      selectedRows: []
    }
  },

  mounted () {},
  methods: {
    toggleModal () {
      this.showModal = !this.showModal
    },
    handleOk () {
      const formItem = {}
      formItem[this.name] = this.$lodash.map(this.selectedRows, this.extra.fields.text).join(',')
      this.$emit('update', {
        name: this.name,
        formItem: formItem,
        selectedRows: this.selectedRows
      })
      this.showModal = false
    },
    handleCancel () {
      this.showModal = false
    },
    onTableSelect (selectedKeys, selectedRows) {
      this.selectedKeys = selectedKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
<style lang="less">
.ant-modal-content {
  .ant-card-wider-padding {
    .ant-card-body {
      padding: 0;
    }
  }
  .ant-card-bordered {
    border: 0;
  }
}
</style>
