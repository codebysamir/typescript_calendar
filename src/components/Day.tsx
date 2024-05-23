import { EventForm, useModalsContext } from '../context/ModalsContext'
import { isToday } from 'date-fns/isToday'
import React, { useEffect, useRef, useState } from 'react'
import eventsObserver from '../helpers/eventsObserver'
import resizeObserver from '../helpers/resizeObserver'

type DayProps = {
    nonMonthDay: boolean,
    oldMonthDay: boolean,
    weekName: string,
    dayNumber: string,
    index: number,
    dayDate: globalThis.Date
}

export default function Day({ nonMonthDay, oldMonthDay, weekName, dayNumber, index, dayDate}: DayProps) {
    const { setIsAddEventModalOpen, setIsEditEventModalOpen, setIsShowAllEventModalOpen, setEventId, setEventDate, eventData } = useModalsContext()
    const [ overflowingEvents, setOverflowingEvents] = useState<EventForm[]>([])
    const [ visibleEvents, setVisibleEvents] = useState<EventForm[]>([])
    const eventsDvRef = useRef<HTMLDivElement>(null)
    const eventsRef = useRef<HTMLButtonElement[]>([])

    useEffect(() => {
        const eventsArr = eventsRef.current
        const eventsDiv = eventsDvRef.current
        if (!eventsArr || !eventsDiv) return

        const observer = eventsObserver(setOverflowingEvents, eventData, setVisibleEvents)
        
        eventsArr.forEach(event => {
            observer.observe(event)
        })

        return () => {
            eventsArr.forEach(event => observer.unobserve(event))
        }
    }, [eventData])

    useEffect(() => {
        const eventsDiv = eventsDvRef.current
        if (!eventsDiv) return

        let overflowingArr = [...overflowingEvents]
        let visibleArr = [...visibleEvents]
        
        const resObserver = resizeObserver(visibleArr, overflowingArr, setOverflowingEvents, setVisibleEvents)
        resObserver.observe(eventsDiv)

        return () => {
            resObserver.disconnect()
        }
    }, [visibleEvents, overflowingEvents])


    function setEventRefs(ref: HTMLButtonElement) {
        if (!ref) return
        console.log(ref?.id)
        if (ref && !eventsRef.current.some(eventRef => eventRef?.id === ref.id)) {
            eventsRef.current.push(ref);
        }
    }

    function handleAddEvent() {
        setIsAddEventModalOpen(true)
        setEventDate(dayDate)
    }

    function handleEditEvent(e: React.MouseEvent<HTMLButtonElement>) {
        const target = e.target 
        console.log(target)
        if (target instanceof HTMLButtonElement) {
            console.log(target)
            const thisEventData = eventData.find(event => event.id === target.id)
            console.log(thisEventData)
            if (thisEventData) {
                setEventId(thisEventData.id)
                setIsEditEventModalOpen(true)
            }
        }
    }

    function handleShowAllEvents() {
        setIsShowAllEventModalOpen(true)
        setEventDate(dayDate)
    }

  return (
    <div className={`day ${nonMonthDay ? "non-month-day": ''} ${oldMonthDay ? "old-month-day" : ''}`}>
        <div className="day-header">
            {(weekName && (index < 7)) && <div className="week-name">{weekName}</div>}
            <div className={`day-number ${isToday(dayDate) ? 'today' : ''}`}>{dayNumber}</div>
            <button className="add-event-btn" onClick={handleAddEvent}>+</button>
        </div>
        <div ref={eventsDvRef} className="events">
        {(eventData.length > 0) && (eventData.filter(event => event.date?.getTime() === dayDate.getTime())
        .filter(ev => ev.id !== overflowingEvents.find(ofe => ofe?.id === ev.id)?.id)
        .toSorted((a, b) => {
            const allDayA = a.allDay ? 1 : 0 
            const allDayB = b.allDay ? 1 : 0 
            return allDayB - allDayA
        })
        .map((event, i) => (
            event.allDay ? 
            <button ref={setEventRefs} key={i} id={event.id} onClick={handleEditEvent} className={`all-day-event ${event.color} event`}>
                <div className="event-name">{event.name}</div>
            </button>
            : 
            <button ref={setEventRefs} key={i} id={event.id} onClick={handleEditEvent} className="event">
                <div className={`color-dot ${event.color}`}></div>
                <div className="event-time">{event.startTime}</div>
                <div className="event-name">{event.name}</div>
            </button>
        )))
        }
        </div>
        {overflowingEvents.length > 0 && <button onClick={handleShowAllEvents} className="events-view-more-btn">+{overflowingEvents.length} More</button>}
    </div>
  )
}
