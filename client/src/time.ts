
export const dateToUnixTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000)
}

export const unixTimestampToDate = (unixTimestamp) => {
  const milliseconds = unixTimestamp * 1000
  return new Date(milliseconds).toLocaleDateString()
}

export const createDate = (date, days, weeks, months, years) => {
  let newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days + 7 * weeks)
  newDate.setMonth(newDate.getMonth() + months)
  newDate.setFullYear(newDate.getFullYear() + years)
  return newDate
}
export const chartConfig = {
  "1D": { days: 1, weeks: 0, months: 0, years: 0, resolution: "1" },
  "1W": { days: 0, weeks: 1, months: 0, years: 0, resolution: "15" },
  "1M": { days: 0, weeks: 0, months: 1, years: 0, resolution: "60" },
  "1Y": { days: 0, weeks: 0, months: 0, years: 1, resolution: "D" },
}