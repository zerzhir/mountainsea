<template>
  <a-form-item :label="label" v-bind="cols">
    <uploader
      ref="uploader"
      :options="uploadOptions"
      :autoStart="false"
      :fileStatusText="fileStatusText"
      v-decorator="[name, { ...decorator }]"
      v-on="event"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      @file-removed="onFileRemove"
    >
      <uploader-unsupport>当前浏览器不支持文件上传组件</uploader-unsupport>
      <uploader-btn v-bind="btnOptions">
        <div class="ant-btn">
          <a-icon type="upload" />
          <span>上传文件</span>
        </div>
      </uploader-btn>

      <uploader-list>
        <template v-slot="{ fileList }">
          <ul>
            <li v-for="file in fileList" :key="file.id">
              <uploader-file :file="file" :list="true"> </uploader-file>
            </li>
          </ul>
        </template>
      </uploader-list>
      <div class="desc">{{ this.extra.desc }}</div>
    </uploader>
  </a-form-item>
</template>

<script>
import SparkMD5 from 'spark-md5'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import storage from 'store'
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
          btnOptions: {},
          maxSize: 1,
          maxNum: 10
        }
      }
    }
  },
  data () {
    return {
      fileList: [],
      fileStatusText: {
        success: '成功',
        error: '失败',
        uploading: '上传中',
        paused: '暂停',
        waiting: '等待'
      },
      defaultOptions: {
        target: process.env.VUE_APP_API_BASE_URL + '/file/file/upload',
        chunkSize: '2048000',
        fileParameterName: 'fileName',
        maxChunkRetries: 3,
        withCredentials: false,
        testMethod: 'GET',
        testChunks: true,
        checkChunkUploadedByResponse: (chunk, res) => {
          res = JSON.parse(res)
          if (res.data.skipUpload) {
            return true
          }
          return (res.data.uploaded || []).indexOf((chunk.offset + 1).toString()) >= 0
        },
        processParams: params => {
          return params
        },
        processResponse: (response, cb, file, chunk) => {
          const res = JSON.parse(response)
          if (res.errno) {
            file.error = true
          }
          cb(null, response)
        },
        headers: {
          Authorization: storage.get(ACCESS_TOKEN)
        },
        query: {}
      }
    }
  },
  mounted () {},
  computed: {
    uploader () {
      return this.$refs.uploader.uploader
    },
    uploadOptions () {
      return this.$lodash.merge(this.defaultOptions, this.options)
    },
    btnOptions () {
      return this.$lodash.merge(
        {
          directory: false,
          single: true,
          attrs: {
            accept: ''
          }
        },
        this.extra.btnOptions
      )
    }
  },
  methods: {
    onFileAdded (file) {
      if (file.size === 0) {
        this.$message.warning('文件大小不能为0')
        return false
      }
      const type = file.name.split('.').slice(-1)
      const accept = this.btnOptions.attrs.accept
      if (accept) {
        const isType = accept.split(',').indexOf(type.toString()) > -1
        if (!isType) {
          this.$message.error('请选择允许上传的文件类型:' + accept)
          return false
        }
      }
      const maxSize = this.extra.maxSize
      if (maxSize) {
        const isSize = file.size / 1024 / 1000 < maxSize
        if (!isSize) {
          this.$message.error(`文件大小超过 ${maxSize} MB!`)
          return false
        }
      }
      this.funcMd5(file)
      return true
    },
    onFileProgress (rootFile, file, chunk) {},
    onFileSuccess (rootFile, file, response, chunk) {
      const res = JSON.parse(response)
      if (res.errno) {
        file.error = true
        return this.$message.warning(res.errmsg)
      }
      if (res.data.needMerge) {
        this.$server
          .fetch('file.fileMerge', {
            ...res.data
          })
          .then(res => {
            if (!this.fileList.some(item => item.id === res.id)) {
              this.fileList.push(res)
            }
            this.onFileChange()

            this.$message.success('上传成功')
          })
          .catch(e => {
            file.error = true
            this.$message.warning('合并失败')
          })
      } else {
        if (!this.fileList.some(item => item.id === res.data.id)) {
          this.fileList.push(res.data)
        }
        this.onFileChange()
        this.fileStatusText.success = '成功'
        this.$message.success('上传成功')
      }
    },
    onFileError (rootFile, file, response, chunk) {
      this.$message.warning('上传失败')
    },
    onFileChange () {
      const formItem = {}
      formItem[this.name] = this.fileList
      this.$emit('update', {
        name: this.name,
        formItem: formItem
      })
    },
    onFileRemove (file) {
      const fileList = [...this.fileList]
      this.$lodash.remove(fileList, item => {
        return item.identifier === file.uniqueIdentifier
      })
      this.fileList = fileList
      this.onFileChange()
    },
    funcMd5 (file) {
      const fileReader = new FileReader()
      const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      let currentChunk = 0
      const chunkSize = 10 * 1024 * 1000
      const chunks = Math.ceil(file.size / chunkSize)
      const spark = new SparkMD5.ArrayBuffer()
      file.pause()
      loadNext()
      fileReader.onload = e => {
        spark.append(e.target.result)
        if (currentChunk < chunks) {
          currentChunk++
          loadNext()
        } else {
          const md5 = spark.end()
          file.uniqueIdentifier = md5
          file.resume()
        }
      }
      fileReader.onerror = function () {
        this.$message.warning(`文件${file.name}读取出错，请检查该文件`)
        file.cancel()
      }
      function loadNext () {
        const start = currentChunk * chunkSize
        const end = start + chunkSize >= file.size ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end))
      }
    }
  },
  watch: {},
  destroyed () {},
  components: {}
}
</script>

<style lang="less">
.uploader {
  .desc {
    position: relative;
    padding-top: 5px;
    color: #999;
    line-height: 23px;
  }
  .uploader-btn {
    padding: 0;
    margin: 0;
    border: 0;
    .ant-btn {
      line-height: 32px;
    }
  }
  .uploader-file {
    border-bottom: 0;
    line-height: 22px;
    vertical-align: middle;
    margin-top: 3px;
    height: 27px;
    padding-bottom: 5px;
    .uploader-file-icon {
      margin-top: 0;
    }
    .uploader-file-icon:before {
      font-size: 14px;
      line-height: 22px;
    }
    &[status='success'] .uploader-file-info:hover {
      background-color: #e6f7ff;
    }
    .uploader-file-progress {
      background: #fff;
      height: 1px;
      bottom: 0;
    }
    .uploader-file-progressing {
      background: #1890ff;
    }
    &[status='error'] .uploader-file-progress {
      background: #ffe0e0;
    }
    .uploader-file-name {
      text-indent: 5px;
    }
    .uploader-file-size {
      font-size: 12px;
      height: auto;
    }
    .uploader-file-actions {
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
      span {
        margin-top: 2px;
      }
    }
    &[status='success'] .uploader-file-remove {
      display: block;
    }
  }
}
</style>
