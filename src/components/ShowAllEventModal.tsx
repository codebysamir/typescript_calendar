import { format } from 'date-fns/format'
import React, { useEffect, useRef } from 'react'
import { Modals, useModalsContext } from '../context/ModalsContext'
import type { DateType } from '../App'

type ShowAllEventsModalProps = DateType & Pick<Modals, "eventData">

export default function ShowAllEventModal({ date, eventData }: ShowAllEventsModalProps) {
    const { setIsShowAllEventModalOpen, setIsEditEventModalOpen, setEventId } = useModalsContext() 

    const modalRef = useRef<HTMLDivElement>(null)
  
    console.log(date)

    useEffect(() => {
      modalRef.current?.focus()
    }, []);
  
    function handleEscapeKey(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.key !== "Escape") return 
      setIsShowAllEventModalOpen(false)
    }

    function handleEditEvent(e: React.MouseEvent<HTMLButtonElement>) {
        console.log(e.target)
        const target = e.target
        if (target instanceof HTMLButtonElement) {
          const thisEventData = eventData.find(event => event.id === target.id)
          console.log(thisEventData)
          if (thisEventData) {
              setEventId(thisEventData.id)
              setIsShowAllEventModalOpen(false)
              setIsEditEventModalOpen(true)
          }
        }
    }

  return (
    <div ref={modalRef} tabIndex={0} className="modal" onKeyDown={handleEscapeKey}>
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            {date && format(date, 'dd/MM/yy')}
            <button onClick={() => setIsShowAllEventModalOpen(false)} className="close-btn">&times;</button>
          </div>
          <div className="events">
            {eventData.length > 0 && eventData.filter(event => event.date?.getTime() === date?.getTime())
            .toSorted((a, b) => {
              const allDayA = a.allDay ? 1 : 0 
              const allDayB = b.allDay ? 1 : 0 
              return allDayB - allDayA
            })
            .map((event, i) => (
                event.allDay ?
                <button key={i} id={event.id} onClick={handleEditEvent} className={`all-day-event ${event.color} event`}>
                <div className="event-name">{event.name}</div>
                </button>
                :
                <button key={i} id={event.id} onClick={handleEditEvent} className="event">
                <div className={`color-dot ${event.color}`}></div>
                <div className="event-time">{event.startTime}</div>
                <div className="event-name">{event.name}</div>
                </button>
            ))}
          </div>
        </div>
    </div>
  )
}
