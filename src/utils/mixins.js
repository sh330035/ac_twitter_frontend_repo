import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      // setting language as Traditional Chinese
      moment.locale('zh-tw')
      return datetime ? moment(datetime).fromNow() : '-'
    }
  },
}

export const accountFilter = {
  filters: {
    accountTag(account) {
      return `@${account}`
    }
  }
}