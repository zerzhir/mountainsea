import ZFormDrawer from '@/components/Form/FormDrawer'
import ZDetailDrawer from '@/components/Detail/DetailDrawer'
import ZTable from '@/components/Table/Table'
import { transDetail, datetime } from '@/utils/filters'
import { mapState } from 'vuex'
export default {
  components: {
    ZTable,
    ZFormDrawer,
    ZDetailDrawer
  },
  data () {
    return {
      api: {
        all: '',
        list: '',
        add: '',
        edit: '',
        detail: '',
        delete: ''
      },
      msg: {
        add: '新增成功',
        edit: '修改成功',
        delete: '删除成功'
      },
      title: {
        add: '新增',
        edit: '修改',
        detail: '详情'
      },
      name: 'XXXX',
      detail: {},
      detailOptions: {
        title: 'XXXX详情',
        width: 600,
        loading: false,
        items: [
          {
            component: 'list',
            data: [],
            loading: false,
            // title: '基本信息',
            extra: {
              grid: {
                column: 1
              }
            }
          }
          // {
          //   component: 'table',
          //   loading: false,
          //   title: 'XXXX内容',
          //   extra: {
          //     table: {
          //       dataSource: [],
          //       columns: [
          //         {
          //           title: '名称',
          //           dataIndex: 'text'
          //         },
          //         {
          //           title: '值',
          //           dataIndex: 'value'
          //         }
          //       ]
          //     }
          //   }
          // }
        ]
      },
      detailFields: {},
      showDetail: false,
      showEdit: false,
      formfields: ['name', 'code', 'content'],
      formValues: {},
      formOptions: {
        title: '新增XXXX',
        loading: false,
        btnAt: 'fixed',
        width: '750',
        grid: 2,
        name: 'formEdit',
        cols: {
          rowSpan: 16
        },
        items: [
          {
            component: 'input',
            label: 'XXXX名称',
            name: 'name',
            options: {
              placeholder: '请输入XXXX名称'
            },
            decorator: {
              rules: [
                {
                  required: true,
                  message: '请输入XXXX名称'
                }
              ]
            }
          },
          {
            component: 'input',
            label: 'XXXX标识',
            name: 'code',
            options: {
              placeholder: '请输入XXXX标识'
            },
            decorator: {
              rules: [
                {
                  required: true,
                  message: '请输入XXXX标识'
                }
              ]
            }
          },
          {
            component: 'table',
            label: 'XXXX内容',
            name: 'content',
            cols: {
              labelCol: {
                span: 24
              },
              wrapperCol: {
                span: 24
              }
            },
            options: {
              placeholder: '请输入XXXX内容'
            },
            decorator: {
              rules: [
                {
                  required: true,
                  message: '请输入XXXX内容'
                }
              ]
            },
            extra: {
              data: [],
              showKey: true,
              columns: [
                {
                  title: '名称',
                  dataIndex: 'text',
                  component: 'input',
                  extra: {
                    label: ' ',
                    options: {
                      placeholder: '请输入名称'
                    },
                    decorator: {
                      rules: [
                        {
                          required: true,
                          message: '请输入名称'
                        }
                      ]
                    }
                  }
                },
                {
                  title: '值',
                  dataIndex: 'value',
                  component: 'input',
                  extra: {
                    label: ' ',
                    options: {
                      placeholder: '请输入值'
                    },
                    decorator: {
                      rules: [
                        {
                          required: true,
                          message: '请输入值'
                        }
                      ]
                    }
                  }
                }
              ],
              tableBtns: ['edit', 'delete', 'cancel', 'save'],
              extra: {
                data: []
              }
            }
          }
        ]
      },
      searchForm: {
        items: [
          {
            component: 'input',
            label: 'XXXX名称',
            name: 'name',
            options: {
              placeholder: '请输入XXXX名称'
            }
          },
          {
            component: 'input',
            label: 'XXXX标识',
            name: 'code',
            options: {
              placeholder: '请输入XXXX标识'
            }
          }
        ]
      },
      tableOptions: {
        showKey: true,
        handleBtns: [
          {
            title: '新增',
            type: 'primary',
            permission: '',
            click: () => {
              this.toggleEdit()
            }
          }
        ],
        tableBtns: [
          {
            title: '详情',
            icon: 'eye',
            permission: '',
            click: record => {
              this.handleDetail(record.id)
            }
          },
          {
            title: '修改',
            icon: 'form',
            permission: '',
            click: record => {
              this.handleEdit(record.id)
            }
          },
          {
            title: '删除',
            icon: 'delete',
            permission: '',
            click: record => {
              this.handleDelete(record.id)
            }
          }
        ],
        columns: [
          {
            title: 'XXXX名称',
            dataIndex: 'name'
          },
          {
            title: 'XXXX标识',
            dataIndex: 'code'
          },
          {
            title: 'XXXX内容',
            dataIndex: 'content'
          }
        ],
        pagination: {
          total: 0
        },
        dataSource: [],
        otherOptions: {
          loading: false
        }
      }
    }
  },
  filters: {
    datetime
  },
  computed: {
    ...mapState({
      enums: state => state.base.enums,
      colors: state => state.app.colors
    })
  },
  created () {},
  methods: {
    fetchAll (values) {
      this.searchValues = values.search
      this.tableOptions.otherOptions.loading = true
      this.$server
        .fetch(this.api.all, values)
        .then(res => {
          try {
            const data = this.helperList(res)
            this.tableOptions.dataSource = data
            this.tableOptions.otherOptions.loading = false
          } catch (e) {
            console.log(e)
          }
        })
        .catch(err => {
          console.log(err)
          this.tableOptions.otherOptions.loading = false
        })
    },
    fetchList (values) {
      this.searchValues = values.search
      this.tableOptions.otherOptions.loading = true
      this.$server
        .fetch(this.api.list, values)
        .then(res => {
          const data = this.helperList(res.data)
          this.tableOptions.dataSource = data
          this.tableOptions.pagination.total = res.count
          this.tableOptions.otherOptions.loading = false
        })
        .catch(err => {
          console.log(err)
          this.tableOptions.otherOptions.loading = false
        })
    },
    fetchDetail (id) {
      return new Promise((resolve, reject) => {
        this.$server
          .fetch(this.api.detail, {
            id: id
          })
          .then(res => {
            for (const i in res) {
              if (res[i] === 0) {
                res[i] = undefined
              }
            }
            this.detail = res
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleSubmit (values) {
      values = this.helperSubmit(values)
      this.formOptions.loading = true
      let apiName = this.api.add
      let succMsg = this.msg.add
      if (this.detail.id) {
        apiName = this.api.edit
        succMsg = this.msg.edit
        values.id = this.detail.id
      }
      this.$server
        .fetch(apiName, values)
        .then(res => {
          this.$message.success(succMsg)
          this.formOptions.loading = false
          this.toggleEdit()
          this.$refs.table.handleRefresh()
        })
        .catch(err => {
          console.log(err)
          this.formOptions.loading = false
        })
    },
    handleEdit (id) {
      try {
        this.formOptions.title = this.title.edit + this.name
        this.toggleEdit()
        this.fetchDetail(id)
          .then(res => {
            const formValues = this.$lodash.pick(res, ['id'].concat(this.formfields))
            this.helperEdit(formValues, res)
          })
          .catch(err => {
            console.log(err)
          })
      } catch (e) {
        console.log(e)
      }
    },
    handleDelete (id) {
      const self = this
      this.$confirm({
        title: '提示',
        content: '删除之后不可恢复，是否确认继续删除操作？',
        okType: 'danger',
        okText: '确定',
        cancelText: '取消',
        onOk () {
          self.$server
            .fetch(self.api.delete, {
              id: id
            })
            .then(res => {
              self.$message.success(self.msg.delete)
              self.$refs.table.handleRefresh()
            })
            .catch(err => {
              console.log(err)
            })
        },
        onCancel () {}
      })
    },
    handleDetail (id) {
      this.detailOptions.loading = true
      this.fetchDetail(id)
        .then(res => {
          this.helperDetail(res)
          this.detailOptions.loading = false
        })
        .catch(err => {
          console.log(err)
        })
      this.toggleDetail()
    },
    toggleDetail () {
      this.showDetail = !this.showDetail
      this.detailOptions.title = this.name + '详情'
      if (!this.showDetail) {
        this.detail = {}
      }
    },
    toggleEdit () {
      this.showEdit = !this.showEdit
      this.formOptions.title = this.title.add + this.name
      if (!this.showEdit) {
        this.detail = {}
        this.formValues = {}
        this.helperReset()
      }
    },
    helperList (data) {
      return data
    },
    helperSubmit (values) {
      return values
    },
    helperEdit (formValues, res) {
      this.formValues = formValues
    },
    helperDetail (values) {
      this.detailOptions.items[0].data = transDetail(this.detailFields, values)
    },
    helperReset () {},
    funcTagRelation (text) {
      return (text || []).map((item, index) => <a-tag color={this.colors[index]}>{item.name}</a-tag>)
    }
  }
}
