import { useState } from 'react'
import './App.css'
import Days from './components/Days'
import Header from './components/Header'
import AddEventModal from './components/AddEventModal'
import { useModalsContext } from './context/ModalsContext'
import EditEventModal from './components/EditEventModal'
import ShowAllEventModal from './components/ShowAllEventModal'

export type DateType = {
  date: globalThis.Date | Date | undefined
}

function App() {
  const [date, setDate] = useState(new Date())
  const { isAddEventModalOpen, isEditEventModalOpen, isShowAllEventModalOpen, eventDate, eventData, setEventData, eventId } = useModalsContext()

  return (
    <div className="calendar">
      <Header date={date} setDate={setDate} />
      <Days date={date}/>
      {isAddEventModalOpen && <AddEventModal date={eventDate} eventData={eventData} setEventData={setEventData} />}
      {isEditEventModalOpen && <EditEventModal eventId={eventId} date={eventDate} eventData={eventData} setEventData={setEventData} />}
      {isShowAllEventModalOpen && <ShowAllEventModal date={eventDate} eventData={eventData} />}
    </div>
  )
}

export default App
