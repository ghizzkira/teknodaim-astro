import dayjs from "dayjs"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"

export const formatDate = (data: string | Date, format: string) => {
  dayjs.extend(LocalizedFormat)

  return dayjs(data).format(format)
}
export const formatDateFromNow = (data: string | Date, locale: "id" | "en") => {
  dayjs.extend(relativeTime)

  const format = dayjs(data).fromNow()

  return translateTimeAgo(format, locale)
}

function translateTimeAgo(timeAgo: string, locale: "en" | "id"): string {
  if (locale === "id") {
    if (timeAgo.includes("a few seconds ago")) {
      return `Beberapa saat yang lalu`
    } else if (timeAgo.includes("a minute ago")) {
      return `Beberapa saat yang lalu`
    } else if (timeAgo.includes("an hour ago")) {
      return `Satu jam yang lalu`
    } else if (timeAgo.includes("a day ago")) {
      return `Satu hari yang lalu`
    } else if (timeAgo.includes("a month ago")) {
      return `Satu bulan yang lalu`
    } else if (timeAgo.includes("a year ago")) {
      return `Satu tahun yang lalu`
    } else if (timeAgo.includes("minutes")) {
      const time = timeAgo.match(/\d+/)
      const minutes = time && parseInt(time[0])
      return minutes ? `Beberapa saat yang lalu` : timeAgo
    } else if (timeAgo.includes("hours")) {
      const time = timeAgo.match(/\d+/)
      const hours = time && parseInt(time[0])
      return hours ? `${hours} jam yang lalu` : timeAgo
    } else if (timeAgo.includes("days")) {
      const time = timeAgo.match(/\d+/)
      const days = time && parseInt(time[0])
      return days ? `${days} hari yang lalu` : timeAgo
    } else if (timeAgo.includes("months")) {
      const time = timeAgo.match(/\d+/)
      const monts = time && parseInt(time[0])
      return monts ? `${monts} bulan yang lalu` : timeAgo
    } else if (timeAgo.includes("years")) {
      const time = timeAgo.match(/\d+/)
      const years = time && parseInt(time[0])
      return years ? `${years} tahun yang lalu` : timeAgo
    } else {
      return timeAgo
    }
  } else {
    return timeAgo
  }
}
