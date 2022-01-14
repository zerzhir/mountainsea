<template>
  <a-form-item :label="label" v-bind="cols">
    <a-form :form="form" class="form-table" layout="vertical">
      <a-table :columns="columns" :dataSource="data" :pagination="false" bordered size="middle">
        <template #key="text, record, index">{{ index + 1 }}</template>
        <template :slot="col" slot-scope="text, record" v-for="(col, idx) in colsName">
          <div :key="col">
            <template v-if="record.editable">
              <component
                :is="columns[idx + keyColumn].component"
                :name="col + record.key"
                @complete="onItemComplete"
                @update="onItemUpdate"
                v-bind="columns[idx + keyColumn].extra"
              />
            </template>
            <!-- <a-form-item v-if="record.editable" :colon="false" label=" " :wrapperCol="{ span: 24 }">
							<a-input
								v-bind="columns[idx+keyColumn].extra.options"
								v-decorator="[col+record.key, { ...columns[idx+keyColumn].extra.decorator }]"
								@change="e => handleChange(e.target.value, record.key, col)"
							/>
            </a-form-item>-->
            <template v-else>{{ text }}</template>
          </div>
        </template>
        <template #handle="text, record">
          <span v-if="record.editable">
            <template v-if="checkAction('save')">
              <a-icon @click="() => handleSave(record.key)" title="保存" type="check" />
              <a-divider type="vertical" />
            </template>
            <template v-if="checkAction('cancel')">
              <a-popconfirm @confirm="() => handleCancel(record.key)" title="是否确认取消?">
                <a-icon title="撤销" type="undo" />
              </a-popconfirm>
              <a-divider type="vertical" />
            </template>
          </span>
          <span v-else>
            <template v-if="checkAction('edit')">
              <a-icon @click="() => handleEdit(record.key)" title="编辑" type="form" />
              <a-divider type="vertical" />
            </template>
          </span>
          <template v-if="checkAction('delete')">
            <a-popconfirm @confirm="() => handleDelete(record.key)" title="是否确认删除?">
              <a-icon title="删除" type="delete" />
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-form>
    <div class="form-table-btn">
      <a-button @click="handleAdd">+新增{{ label }}</a-button>
    </div>
  </a-form-item>
</template>
<script>
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
    value: {
      type: Array,
      default () {
        return []
      }
    },
    extra: {
      type: Object,
      default () {
        return {
          modal: {},
          columns: [],
          data: [],
          tableBtns: [],
          showKey: false
        }
      }
    }
  },
  data () {
    return {
      data: [],
      dataKey: 0,
      cacheData: [],
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    const data = [...this.extra.data]
    this.data = this.funcPlusKey(data)
    this.$nextTick(() => {
      this.onTableChange()
    })
  },
  watch: {
    tableData (val) {
      this.data = this.funcPlusKey(val)
      this.$nextTick(() => {
        this.onTableChange()
      })
    }
  },
  computed: {
    tableData () {
      return this.extra.data || []
    },
    values () {
      const values = {}
      this.data.forEach(item => {
        this.colsName.forEach(itm => {
          values[itm + item.key] = item[itm]
        })
      })
      return values
    },
    keyColumn () {
      if (this.extra.showKey) {
        return 1
      }
      return 0
    },
    colsName () {
      return this.$lodash.map(this.extra.columns, 'dataIndex')
    },
    columns () {
      const columns = this.$lodash.cloneDeep(this.extra.columns)
      columns.forEach(item => {
        const component = this.$lodash.upperFirst(item.component)
        Object.assign(item, {
          component: () => import('@/components/Form/items/' + component)
        })

        item.scopedSlots = { customRender: item.dataIndex }
      })
      if (this.extra.showKey) {
        columns.unshift({
          title: '序号',
          dataIndex: 'key',
          width: 50,
          align: 'center',
          scopedSlots: {
            customRender: 'key'
          }
        })
      }
      if (this.extra.tableBtns) {
        columns.push({
          title: '操作',
          dataIndex: 'handle',
          // fixed: 'right',
          width: 30 * this.extra.tableBtns.length,
          scopedSlots: {
            customRender: 'handle'
          }
        })
      }
      return columns
    }
  },
  methods: {
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    handleAdd () {
      const data = [...this.data]
      const newData = {
        key: this.dataKey,
        editable: true
      }
      this.colsName.forEach(item => {
        newData[item] = undefined
      })
      this.data = [...data, newData]
      this.dataKey++
    },
    handleEdit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        const itemData = {}
        Object.keys(target).forEach(item => {
          this.form.getFieldDecorator(item + target.key)
          itemData[item + target.key] = target[item]
        })
        this.form.setFieldsValue(itemData)
        this.data = newData
      }
    },
    handleSave (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      const fields = []
      this.colsName.forEach(item => {
        fields.push(item + key)
      })
      this.form.validateFields(fields, (err, values) => {
        if (!err) {
          this.colsName.forEach(item => {
            target[item] = values[item + key]
          })
          if (target) {
            delete target.editable
            this.data = newData
            this.cacheData = newData.map(item => ({ ...item }))
            this.onTableChange()
          }
        }
      })
    },
    handleCancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
    handleDelete (key) {
      const newData = [...this.data]
      this.data = newData.filter(item => item.key !== key)
      this.onTableChange()
    },
    checkAction (action) {
      return this.extra.tableBtns.indexOf(action) > -1
    },
    onTableChange () {
      const formItem = {}
      formItem[this.name] = this.data
      this.$emit('update', {
        name: this.name,
        formItem: formItem,
        selectedRows: this.data
      })
    },
    onItemUpdate ({ name, formItem, selectedRows }) {
      this.form.getFieldDecorator(name)
      if (selectedRows) {
        const formItems = { ...this.formItems }
        if (!formItems[this.name]) {
          formItems[this.name] = {}
        }
        formItems[this.name][name] = selectedRows
        this.$store.commit('base/UPDATE_FORMITEMS', formItems)
      }

      this.form.setFieldsValue(formItem)
    },
    onItemComplete (name) {
      const itemValue = this.$lodash.pick(this.values, name)
      this.form.setFieldsValue(itemValue)
    },
    funcPlusKey (data) {
      data.forEach(item => {
        item.key = this.dataKey
        this.dataKey++
      })
      return data
    }
  }
}
</script>
<style lang="less">
.form-table {
  .ant-form-item {
    margin-bottom: 0;
    padding: 8px;
  }
  .ant-form-item-label {
    overflow: visible;
    position: absolute;
    left: -2px;
  }

  .ant-form-explain {
    position: absolute;
    left: 0;
    bottom: -16px;
    font-size: 10px;
  }
  .ant-form-item-required:before {
    position: relative;
    top: 5px;
  }
}

.form-table-btn {
  padding: 10px;
  text-align: center;
}
</style>
