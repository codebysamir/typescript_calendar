import { startOfISOWeek, format, lastDayOfISOWeek, lastDayOfMonth, startOfMonth, eachDayOfInterval, isThisMonth, isPast } from "date-fns"
import { addDays } from "date-fns/addDays"

const renderDays = (dateToChange: Date) => {
    console.log(dateToChange)
    if (!dateToChange || isNaN(dateToChange?.getTime())) return
    const today = new Date(dateToChange)
    const firstDayOfMonth = startOfMonth(today)
    const lastDayOfMonth_ = lastDayOfMonth(today)
    const firstDayOfCalendar = startOfISOWeek(firstDayOfMonth)
    const lastDayOfCalendar = lastDayOfISOWeek(lastDayOfMonth_)
    const daysInMonth = eachDayOfInterval({start: firstDayOfCalendar, end: lastDayOfCalendar})
    const detailedDaysArr = daysInMonth.map((day) => ({
        dayDate: day,
        date: format(day, 'dd'),
        weekName: format(day, 'eeee'),
        nonMonthDay: !isThisMonth(day),
        oldMonthDay: isPast(addDays(day, 1))
    }))
    return detailedDaysArr
}

export default renderDays