<template>
  <z-table v-bind="tableOptions" @fetch="extra.fetch || fetchData" />
</template>
<script>
import ZTable from '@/components/Table/Table'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    extra: {
      type: Object,
      default () {
        return {
          table: {},
          fetch: () => {}
        }
      }
    }
  },
  components: {
    ZTable
  },
  data () {
    return {}
  },
  computed: {
    tableOptions () {
      const table = Object.assign(
        {
          showKey: true,
          showRefresh: false,
          initFetch: false,
          pagination: false,
          rowKey: 'Id'
        },
        this.extra.table
      )
      return table
    }
  },
  methods: {
    fetchData () {

    }
  },
  mounted () {}
}
</script>
<style></style>
