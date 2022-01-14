<template>
  <a-form
    :ref="name"
    :form="form"
    :layout="layout"
    v-bind="cols"
    @submit="handleSubmit"
    class="z-form"
    :hideRequiredMark="hideRequiredMark"
  >
    <a-row :style="{ paddingBottom: btnAt === 'fixed' ? '65px' : 'auto' }" :gutter="cols.rowSpan || 0">
      <slot name="header"></slot>
      <div v-for="(item, index) in itemsOptions" :key="index">
        <a-col
          :span="item.data.cols ? item.data.cols.span || '24' : colSpan"
          :style="{ display: index < displayCount ? 'block' : 'none' }"
          v-if="!item.data.extra.hidden"
        >
          <b-icon class="z-form-icon" :type="item.data.extra.icon" v-if="item.data.extra.icon"></b-icon>
          <component
            :is="item.component"
            v-bind="item.data"
            @update="onItemUpdate"
            @complete="onItemComplete"
          ></component>
        </a-col>
      </div>
      <slot name="extra"></slot>
      <div :class="'form-btns form-btns-' + btnAt" v-if="btnAt === 'inline'">
        <a-divider :dashed="true" v-if="showSplit" />
        <slot name="btnLeft"></slot>
        <a-col :offset="btnOffset">
          <a-button type="primary" html-type="submit" :loading="loading">
            {{ btnText[0] }}
          </a-button>
          <a-button
            class="ml-10"
            :type="item.type"
            @click="handleCall(item.click, item.isCheck)"
            v-for="(item, index) in formBtns"
            :key="index"
          >{{ item.title }}</a-button
          >
          <a-button class="ml-10" @click="handleReset" v-if="btnText[1]">
            {{ btnText[1] }}
          </a-button>
          <a-button class="ml-10" @click="handleBack" v-if="isPage" type="dashed">返回</a-button>
          <a class="ml-10" @click="toggleMore" v-if="initShow && initShow < itemsOptions.length">
            {{ showMore ? '收起' : '展开' }}
            <a-icon :type="showMore ? 'up' : 'down'" />
          </a>
        </a-col>
      </div>

      <slot name="footer"></slot>
    </a-row>

    <div :class="'form-btns form-btns-' + btnAt" v-if="btnAt && btnAt !== 'inline'">
      <a-divider :dashed="true" v-if="showSplit" />
      <slot name="btnLeft"></slot>
      <a-col :offset="btnOffset">
        <a-button type="primary" html-type="submit" :loading="loading">
          {{ btnText[0] }}
        </a-button>
        <a-button
          class="ml-10"
          :type="item.type"
          @click="handleCall(item.click, item.isCheck)"
          v-for="(item, index) in formBtns"
          :key="index"
        >{{ item.title }}</a-button
        >
        <a-button class="ml-10" @click="handleReset" v-if="btnText[1]">
          {{ btnText[1] }}
        </a-button>
        <a-button class="ml-10" @click="handleBack" v-if="isPage" type="dashed">返回</a-button>
        <a class="ml-10" @click="toggleMore" v-if="initShow && initShow < itemsOptions.length">
          {{ showMore ? '收起' : '展开' }}
          <a-icon :type="showMore ? 'up' : 'down'" />
        </a>
      </a-col>
    </div>
  </a-form>
</template>
<script>
/*
	props:{
		name: 'formName',
		title: '标题',
		layout: '表单布局：horizontal，vertical，inline',
		grid:1,//一行显示多少项
		btnAt: 'left,center,right,fixed',//左中右，固定到最底部
		initShow:2,//初始化显示2项，并显示展开收缩
		cols:{
			labelCol:{span:5},
			wrapperCol: {span:18}
		},
		items:[{
			component:'input',//表单类型，对应items里的组件
			extra:'附加内容',//表单项的备用数据，例如单选多选的选项
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
			}
		}]
	}

	*/
export default {
  name: 'BForm',
  props: {
    name: {
      type: String,
      default: 'formName'
    },
    layout: {
      type: String,
      default: 'horizontal' // horizontal，vertical，inline
    },
    grid: {
      type: Number,
      default: 1
    },
    btnAt: {
      type: [String, Boolean],
      default: 'right' // left,center,right,fixed
    },
    formBtns: {
      type: Array,
      default () {
        return []
      }
    },
    initShow: {
      type: Number,
      default: 0 // 初始化显示几项，并显示展开收缩，0代表直接显示
    },
    cols: {
      type: Object,
      default () {
        return {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }
      }
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    showSplit: {
      type: Boolean,
      default: false
    },
    hideRequiredMark: {
      type: Boolean,
      default: false
    },
    submitReset: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    isPage: {
      type: Boolean,
      default: false
    },
    btnText: {
      type: Array,
      default () {
        return ['确定']
      }
    },
    values: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showMore: false
    }
  },
  computed: {
    formItems () {
      return this.$store.state.base.formItems || {}
    },
    formItem () {
      return this.$store.state.base.formItems[this.name] || {}
    },
    itemsOptions () {
      const itemsOptions = []
      const items = this.items || []
      items.forEach(item => {
        item.extra = item.extra || {}
        itemsOptions.push({
          component: () => import('@/components/Form/items/' + this.$lodash.upperFirst(item.component)),
          data: { ...item }
        })
      })
      return itemsOptions
    },
    btnOffset () {
      const labelCol = this.cols.labelCol || {}
      const wrapperCol = this.cols.wrapperCol || {}
      return (labelCol.span || 0) + (labelCol.offset || 0) + (wrapperCol.offset || 0)
    },
    colSpan () {
      return 24 / this.grid
    },
    displayCount () {
      if (!this.initShow) {
        return this.items.length
      }
      return this.showMore ? this.items.length : this.initShow
    }
  },
  watch: {
    values (val) {
      if (JSON.stringify(val) === '{}') {
        this.handleReset()
      }
      Object.keys(val).forEach(item => {
        if (this.$lodash.isPlainObject(val[item])) {
          Object.keys(val[item]).forEach(itm => {
            if (!this.$lodash.isPlainObject(val[item][itm])) {
              this.form.getFieldDecorator(item + '.' + itm)
            }
          })
        } else {
          this.form.getFieldDecorator(item)
        }
      })
      this.form.setFieldsValue(val)
    },
    loading (newVal, oldVal) {
      // if (!newVal && !this.values.Id) {
      // 	this.handleReset()
      // }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {
      onValuesChange: (props, values) => {
        const fieldsValues = this.form.getFieldsValue()
        this.$emit('change', Object.assign(fieldsValues, values))
      }
    })
  },
  methods: {
    fetchValues (name) {
      return this.form.getFieldsValue(name)
    },
    handleSubmit (e) {
      if (e) {
        e.preventDefault()
      }
      this.form.validateFields((err, vals) => {
        if (!err) {
          const values = this.funcSwitchValues(vals)
          if (this.submitReset) {
            this.handleReset()
          }
          this.$emit('submit', values)
        }
      })
    },
    handleCall (callback, isCheck) {
      if (isCheck) {
        this.form.validateFields((err, vals) => {
          if (!err) {
            const values = this.funcSwitchValues(vals)
            callback(values)
          }
        })
      } else {
        callback()
      }
    },
    handleBack () {
      this.$router.go(-1)
    },
    handleReset () {
      this.form.resetFields()
      const formItems = { ...this.formItems }
      formItems[this.name] = {}
      this.$store.commit('base/UPDATE_FORMITEMS', formItems)
    },
    toggleMore () {
      this.showMore = !this.showMore
    },
    onItemUpdate ({ name, formItem, selectedRows }) {
      this.form.getFieldDecorator(name)
      if (selectedRows) {
        const formItems = this.$lodash.cloneDeep(this.formItems)
        if (!formItems[this.name]) {
          formItems[this.name] = {}
        }
        formItems[this.name][name] = selectedRows
        this.$store.commit('base/UPDATE_FORMITEMS', formItems)
      }
      // console.log(name, formItem)
      this.form.setFieldsValue(formItem)
    },
    onItemComplete (name) {
      const itemValue = this.$lodash.pick(this.values, name)
      this.form.setFieldsValue(itemValue)
    },
    funcSwitchValues (vals) {
      const items = this.items || []
      const values = this.$lodash.cloneDeep(vals)
      items.forEach(item => {
        if (!values[item.name]) {
          return
        }
        if (typeof values[item.name] === 'string') {
          values[item.name] = values[item.name].trim()
        }
        switch (item.component) {
          case 'relation': {
            const valueField = this.$lodash.has(item, 'extra.fields.value') ? item.extra.fields.value : 'id'
            values[item.name] = this.$lodash.map(this.formItem[item.name], valueField).join(',')
            break
          }

          // case 'datePicker': {
          // 	const format = this.$lodash.has(item, 'extra.format') ? item.extra.format : 'YYYY-MM-DD'
          // 	let itemValue = values[item.name]
          // 	if (Array.isArray(itemValue)) {
          // 		itemValue.forEach((itm, idx) => {
          // 			itemValue[idx] = itm.format(format)
          // 		})
          // 	} else {
          // 		itemValue = itemValue.format(format)
          // 	}
          // 	values[item.name] = itemValue
          // 	break
          // }

          default:
            break
        }
      })
      return values
    }
  }
}
</script>
<style lang="less">
.form-btns {
  &-left {
    text-align: left;
  }

  &-center {
    text-align: center;
  }

  &-right {
    text-align: right;
  }
  &-inline {
    position: absolute;
    right: 18px;
    bottom: 28px;
    text-align: right;
    z-index: 100;
  }
  &-fixed {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 15px 20px;
    background: #fff;
    text-align: right;
    z-index: 100;
  }
}
.ant-form-item-control {
  line-height: auto;
}
.ant-form-item-label > label {
  color: #000;
  font-size: 15px;
}
.z-form {
  &-icon {
    position: absolute;
    left: -25px;
    top: 12px;
    font-size: 18px;
  }
  margin-bottom: 15px;
  .ant-input,
  .ant-select-selection,
  .ant-input-number {
    // border: 0 !important;
    // border-bottom: 1px solid #eeeeee !important;
    border: 1px solid #444 !important;
  }

  .ant-btn-primary {
    // background: #375ef6;
    // box-shadow: 0px 4px 19px 0px rgba(55, 94, 246, 0.59);
    // border-radius: 5px;
    color: #111;
  }
}
.ml-10 {
  margin-left: 10px;
}
</style>
