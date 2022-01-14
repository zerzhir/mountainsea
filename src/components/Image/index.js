export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      showPreview: false
    }
  },
  methods: {
    handlePreview () {
      this.showPreview = true
    },
    handleCancel () {
      this.showPreview = false
    }
  },
  render () {
    return (
      <div style='display:inline-block;margin:5px'>
        <a-avatar src={this.url} onClick={this.handlePreview} size={this.size} shape='square' style='padding: 0'/>
        <a-modal footer={null} visible={this.showPreview} onCancel={this.handleCancel} width={1000}>
          <template slot='closeIcon'>
            <a-icon
              type='close'
              style={{
                background: 'rgba(0,0,0,.4)',
                borderRadius: '20px',
                padding: '6px',
                color: '#cccccc',
                fontSize: '10px',
                top: '-5px',
                right: '-5px'
              }}
            />
          </template>
          <img src={this.url} style='width: 100%' />
        </a-modal>
      </div>
    )
  }
}
