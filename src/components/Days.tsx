import { useMemo } from 'react'
import Day from './Day'
import renderDays from '../helpers/renderDays'
import type { DateType } from '../App'

export default function Days({ date }: DateType) {

  
  console.log(date)
  const daysInCalendar = date && useMemo(() => renderDays(date), [date])
  console.log(daysInCalendar)

  return (
    <div className='days'>
        {(daysInCalendar && daysInCalendar.length > 0) && daysInCalendar?.map((day, i) => {
            return <Day key={i} index={i} dayDate={day.dayDate} dayNumber={day.date} weekName={day.weekName} nonMonthDay={day.nonMonthDay} oldMonthDay={day.oldMonthDay}/>
        })}
    </div>
  )
}
