import { addMonths } from 'date-fns/addMonths'
import { format } from 'date-fns/format'
import { de } from 'date-fns/locale'
import { subMonths } from 'date-fns/subMonths'
import React from 'react'
import type { DateType } from '../App'

type HeaderProps = DateType & {
  setDate: React.Dispatch<React.SetStateAction<globalThis.Date>>
}

export default function Header({ date, setDate }: HeaderProps) {
  console.log(date)

  function handleBackwardDate() {
    setDate(prevDate => subMonths(prevDate, 1))
  }

  function handleForwardDate() {
    setDate(prevDate => addMonths(prevDate, 1))
  }

  return (
    <div className='header'>
        <button className="btn" onClick={() => setDate(new Date())}>Today</button>
        <div>
            <button className="month-change-btn" onClick={handleBackwardDate}>&lt;</button>
            <button className="month-change-btn" onClick={handleForwardDate}>&gt;</button>
        </div>
        <span className="month-title">{date && format(date, 'MMMM yyyy', {locale: de})}</span>
    </div>
  )
}
