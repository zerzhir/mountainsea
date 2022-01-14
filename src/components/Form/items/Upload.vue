<template>
  <a-form-item :label="label" class="upload-item" v-bind="cols">
    <a-upload
      :beforeUpload="beforeUpload"
      :remove="handleRemove"
      @change="handleChange"
      @preview="handlePreview"
      :transformFile="handleTransform"
      v-bind="uploadOptions"
      v-decorator="[
        name,
        {
          valuePropName: 'fileList',
          getValueFromEvent: handleNormalize,
          ...decorator
        }
      ]"
      v-on="event"
    >
      <template v-if="uploadOptions.listType === 'picture-card'">
        <div v-if="fileList.length < fileNum || fileNum === 0">
          <a-icon type="upload" />
          <div class="ant-upload-text">{{ uploadOptions.uploadText }}</div>
        </div>
      </template>
      <a-button v-else>
        <a-icon type="plus" />
        {{ uploadOptions.uploadText }}
      </a-button>
    </a-upload>
    <div class="ant-upload-desc" v-if="extra.desc">{{ extra.desc }}</div>
    <a-modal :footer="null" :visible="showPreview" @cancel="handleCancel" v-bind="modal">
      <template slot="closeIcon">
        <a-icon
          type="close"
          :style="{
            background: 'rgba(0,0,0,.4)',
            borderRadius: '20px',
            padding: '6px',
            color: '#cccccc',
            fontSize: '10px',
            top: '-5px',
            right: '-5px'
          }"
        />
      </template>
      <img :src="imageUrl" alt="preview" style="width: 100%" />
    </a-modal>
  </a-form-item>
</template>
<script>
import store from '@/store'
import SparkMD5 from 'spark-md5'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
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
          desc: '',
          modal: {},
          maxSize: 1,
          maxNum: 10,
          query: {
            access: '',
            rename: false
          },
          data: []
        }
      }
    }
  },
  data () {
    return {
      loading: false,
      showPreview: false,
      imageUrl: '',
      fileList: [],
      identifier: '',
      defaultOptions: {
        name: 'fileName',
        action: process.env.VUE_APP_API_BASE_URL + '/file/file/singleUpload',
        headers: {
          Authorization: store.state.base.token
        },
        data: file => {
          return {
            filename: file.name,
            totalSize: file.size,
            currentChunkSize: file.size,
            chunkSize: file.size,
            chunkNumber: 1,
            totalChunks: 1,
            relativePath: file.name,
            identifier: file.identifier,
            ...this.extra.query
          }
        },
        showUploadList: true,
        listType: 'picture-card',
        uploadText: '上传',
        multiple: false
      }
    }
  },
  watch: {
    files (newVal, oldVal) {
      this.fileList = newVal
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fileList = this.files
      this.$emit('complete', this.name)
    })
  },
  computed: {
    uploadOptions () {
      return this.$lodash.merge(this.defaultOptions, this.options)
    },
    fileNum () {
      if (this.extra.maxNum) {
        return parseInt(this.extra.maxNum)
      }
      return 0
    },
    files () {
      return this.extra.data
    },
    modal () {
      return this.$lodash.merge({ width: 1000 }, this.extra.modal)
    }
  },
  methods: {
    handleNormalize (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    handleTransform (file) {
      return new Promise((resolve, reject) => {
        this.funcMd5(file)
          .then(res => {
            file.identifier = res
            resolve(file)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleRequest (file) {},
    handleRemove (file) {},
    handleCancel () {
      this.showPreview = false
    },
    async handlePreview (file) {
      if (this.uploadOptions.listType === 'text') {
        return
      }
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.imageUrl = file.url || file.preview
      this.showPreview = true
    },
    beforeUpload (file, fileList) {
      const accept = this.options.accept
      const type = file.name.split('.').slice(-1)
      let isType = true
      let isSize = true
      if (accept) {
        isType = accept.split(',').indexOf(type.toString()) > -1
        console.log(type, accept, isType)
        if (!isType) {
          this.$message.error('请选择允许上传的文件类型:' + accept)
        }
      }
      if (this.$lodash.has(this.data, 'extra.maxSize')) {
        isSize = file.size / 1024 / 1024 < this.extra.maxSize
        if (!isSize) {
          this.$message.error(`文件大小超过 ${this.extra.maxSize} MB!`)
        }
      }
      return isType && isSize
    },
    handleChange ({ fileList, file }) {
      const status = file.status
      this.loading = status === 'uploading'
      if (status === 'uploading' || status === 'done' || status === 'removed') {
        setTimeout(() => {
          this.fileList = fileList
        }, 500)
      }
      if (status === 'error') {
        return this.$message.error(`${file.name} 上传失败.`)
      }
      if (status === 'done') {
        return this.$message.success(`${file.name} 上传成功.`)
      }
    },
    funcMd5 (file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        const spark = new SparkMD5.ArrayBuffer()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = e => {
          spark.append(e.target.result)
          const md5 = spark.end()
          resolve(md5)
        }
        fileReader.onerror = function () {
          reject(new Error(`文件${file.name}读取出错，请检查该文件`))
        }
      })
    }
  }
}
</script>
<style lang="less">
.ant-upload-desc {
  position: relative;
  top: -20px;
  color: #999;
  line-height: 25px;
  display: inline-block;
}
.ant-upload-list {
  display: inline-block;
}
.ant-upload-select-picture-card {
  width: 128px;
  .avatar {
    width: 100%;
  }
  i {
    font-size: 32px;
    color: #999;
  }
}
.ant-upload-select-picture-card {
  .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}
.ant-upload-list-picture-card {
  .ant-upload-list-item {
    overflow: hidden;
  }
}
.ant-upload-list-picture-card {
  min-height: 112px;
}
.upload-list-inline {
  .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
}
.upload-item {
  margin-bottom: 0;
}
</style>
