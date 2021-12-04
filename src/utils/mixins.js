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

export const timeFormatFilter = {
  filters: {
    timeFormat(datetime) {
      // setting language as Traditional Chinese
      moment.locale('zh-tw')
      // setting time format
      return datetime ? moment(datetime).format('a h:mm・YYYY年MMMDo') : '-'
    },
  },
}

export const accountFilter = {
  filters: {
    accountTag(account) {
      return `@${account}`
    }
  }
}

export const numberFilterEng = {
  filters: {
    numberFormatEng(number) {
      if (!number) {
        return
      } else if (number >= 1000000000) {
        const shortValue = number / 1000000000
        const isTensDigit = shortValue / 10 >= 1
        return isTensDigit ? shortValue + 'G' : shortValue.toFixed(1) + 'G'
      }
      else if (number >= 1000000) {
        const shortValue = number / 1000000
        const isTensDigit = shortValue / 10 >= 1
        return isTensDigit ? shortValue + 'M' : shortValue.toFixed(1) + 'M'
      }
      else if (number >= 1000) {
        const shortValue = number / 1000
        const isTensDigit = shortValue / 10 >= 1
        return isTensDigit ? shortValue + 'K' : shortValue.toFixed(1) + 'K'
      } else {
        return number
      }
    }
  }
}


export const numberFilterTC = {
  filters: {
    numberFormatTC(number) {
      if (!number) {
        return
      } else if (number >= 100000000) {
        const shortValue = number / 100000000
        const isTensDigit = shortValue / 10 >= 1
        return isTensDigit ? shortValue + '億' : shortValue.toFixed(1) + '億'
      } else if (number >= 10000) {
        const shortValue = number / 10000
        const isTensDigit = shortValue / 10 >= 1
        return isTensDigit ? shortValue + '萬' : shortValue.toFixed(1) + '萬'
      } else {
        return number
      }
    }
  }
}