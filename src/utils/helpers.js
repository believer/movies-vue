import moment from 'moment'

export const timeAgo = (date) => moment(date).fromNow()
export const toDate = (date) => moment(date).format('YYYY-MM-DD')
export const toUnix = (date) => moment(date).format('X')