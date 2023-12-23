import moment from 'moment'

export function formatedDate(date, format) {
  return moment(date).format(format)
}
