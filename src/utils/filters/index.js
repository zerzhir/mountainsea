import { cloneDeep, unset, forIn, get, isArray, isString, isPlainObject } from 'lodash'
import moment from 'moment'
export const transTree = (data, key = 'id', parentKey = 'parent_id', rootId = '') => {
  const tree = []
  data.forEach(item => {
    if (item[parentKey] !== rootId) {
      const itm = data.filter(itm => itm.id === item[parentKey])[0] || {}
      if (!itm.children) {
        itm.children = []
      }
      itm.children.push(item)
    } else {
      tree.push(item)
    }
  })
  return tree
}
export const reduceTree = (data, arr = []) => {
  data.forEach(item => {
    if (item.children && item.children.length) {
      reduceTree(item.children, arr)
      const temp = cloneDeep(item)
      unset(temp, 'children')
      arr.push(temp)
    } else {
      arr.push(item)
    }
  })
  return arr
}

export const transData = (data, fields = { title: 'title', value: 'id', key: 'id' }) => {
  data.forEach(item => {
    item['title'] = item[fields.title]
    item['label'] = item[fields.title]
    item['value'] = item[fields.value].toString()
    item['key'] = item[fields.key].toString()
    if (item.children && item.children.length) {
      transData(item.children)
    }
  })
  return data
}

export const transDetail = (fields, data) => {
  const dataList = []
  forIn(fields, (value, key) => {
    const item = {
      key: value,
      value: get(data, key)
    }
    if (isArray(value)) {
      item.key = value[0]
      item.type = value[1]
      if (value[2] && value[1] === 'tag') {
        item.enum = value[2]
      }
      if (value[2] && value[1] === 'time') {
        item.format = value[2]
      }
      if (value[3]) {
        item.extra = value[3]
      }
    }
    dataList.push(item)
  })
  return dataList
}

export const transHistory = (data, fields, callback) => {
  const items = []
  data.forEach(item => {
    let value = ''
    fields.forEach(itm => {
      value += get(item, itm) + '<br/>'
    })
    items.push({
      value: value,
      click: () => {
        callback(item)
      }
    })
  })
  return items
}

export const enum2Str = content => {
  const fieldValue = []
  content.forEach(item => {
    fieldValue.push(item.value + ':' + item.text)
  })
  return fieldValue.join(',')
}
export const str2Enum = content => {
  const fieldValue = content.split(',')
  const transData = []
  let key = 0
  fieldValue.forEach(item => {
    const value = item.split(':')
    transData.push({
      key: key++,
      text: value[1],
      value: value[0]
    })
  })
  return transData
}

export const datetime = (time, format) => {
  return moment(time).format(format || 'YYYY-MM-DD HH:mm:ss')
}
export const fileUrl = identifier => {
  if (!identifier) {
    return ''
  }
  return `${process.env.VUE_APP_API_BASE_URL}/file/file/download?fileId=${identifier}`
}
export const transferPicture = (values, field = 'picture') => {
  const target = values[field]
  if (isString(target) && target) {
    const pics = target.split(',')
    values[field] = pics.map(item => ({
      uid: item,
      name: item,
      status: 'done',
      url: fileUrl(item),
      thumbUrl: fileUrl(item),
      identifier: item
    }))
  }
  return values
}

export const normalizePicture = value => {
  if (Array.isArray(value)) {
    return value.map(item => item.identifier).join(',')
  } else if (isPlainObject(value) && isArray(value.fileList)) {
    const identifiers = value.fileList.map(item => item.identifier)
    return identifiers.join(',')
  } else {
    return value
  }
}

export const idsToMap = ids => {
  return ids.map(item => ({
    id: item
  }))
}
export const mapToIds = ids => {
  return ids.map(item => item.id)
}

export const searchItems = items => {
  return items.reduce(function (result, item) {
    if (item.search) {
      result.push({
        component: item.component,
        label: item.label,
        name: item.name,
        options: item.options,
        extra: item.extra
      })
    }
    return result
  }, [])
}

export const formItems = items => {
  return items.reduce(function (result, item) {
    if (!item.hideInForm) {
      result.push({
        ...item
      })
    }
    return result
  }, [])
}

export const tableItems = items => {
  return items.reduce(function (result, item) {
    if (item.table || !item.hideInTable) {
      result.push({
        title: item.label,
        dataIndex: item.name,
        ...item.table
      })
    }
    return result
  }, [])
}

export const formFields = items => {
  return items.reduce(function (result, item) {
    if (!item.hideInForm) {
      result.push(item.name)
    }
    return result
  }, [])
}

export const detailFields = items => {
  const detailItems = items.reduce(function (result, item) {
    if (item.extra && item.extra.fields) {
      result[item.name] = [item.label, 'tag', item.extra.fields.text]
    } else if (item.extra && isString(item.extra.data)) {
      result[item.name] = [item.label, 'tag', item.extra.data]
    } else if (item.extra && item.options.accept) {
      result[item.name] = [item.label, 'image']
    } else if (item.label.indexOf('时间') > -1) {
      result[item.name] = [item.label, 'time']
    } else {
      result[item.name] = item.label
    }
    return result
  }, [])

  return {
    id: 'ID',
    ...detailItems,
    create_time: ['创建时间', 'time'],
    create_by: '创建人'
  }
}

export const formatPrice = price => {
  if (!price) return 0
  const arrayFromPrice = price.toString().split('')
  let formatedPrice = arrayFromPrice.join('')

  price
    .toString()
    .split('')
    .forEach((item, index, arr) => {
      if (item === '.') {
        const endIndex = index + 2 >= arr.length ? index + 2 : index + 3
        formatedPrice = arr.slice(0, endIndex).join('')
      }
    })

  return formatedPrice
}
