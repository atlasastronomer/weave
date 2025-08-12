import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(relativeTime)
dayjs.extend(calendar)

const formatTimestamp = (ts) => {
  const date = dayjs(ts)
  if (dayjs().diff(date, 'day') >= 7) {
    return date.format('M/D/YYYY')
  }
  return date.fromNow()
}

export default formatTimestamp