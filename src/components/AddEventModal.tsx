import React, { useEffect, useRef, useState } from 'react'
import { EventForm, Modals, useModalsContext } from '../context/ModalsContext'
import type { DateType } from '../App';
import { format } from 'date-fns/format';

type AddEventModalProps = DateType & Pick<Modals, "eventData" | "setEventData">

export default function AddEventModal({ date, setEventData }: AddEventModalProps) {
  const [formData, setFormData] = useState<EventForm>({
    id: crypto.randomUUID(),
    date: date,
    name: '',
    allDay: false, 
    startTime: undefined, 
    endTime: undefined, 
    color: 'blue',
  })
  const { setIsAddEventModalOpen } = useModalsContext()
  const modalRef = useRef<HTMLDivElement>(null)
  

  useEffect(() => {
    modalRef.current?.focus()
  }, []);

  function handleEscapeKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape") return 
    setIsAddEventModalOpen(false)
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  function handleEventFormSubmit(event: React.FormEvent) {
    // if (!formData.allDay && !formData.startTime) return
    event.preventDefault()
    console.log(formData)
    setEventData(ed => [...ed, formData])
    setIsAddEventModalOpen(false)
  }

  function handleCloseModal() {
    modalRef.current?.classList.add('closing')
    setTimeout(() => setIsAddEventModalOpen(false), 250)
  }

  return (
    <div ref={modalRef} tabIndex={0} className="modal" onKeyDown={handleEscapeKey}>
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>Add Event</div>
            <small>{date && format(date, 'dd/MM/yy')}</small>
            <button className="close-btn" onClick={handleCloseModal}>&times;</button>
          </div>
          <form onSubmit={handleEventFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input required type="text" name="name" id="name" value={formData.name} onChange={handleInputChange}/>
            </div>
            <div className="form-group checkbox">
              <input type="checkbox" defaultChecked={formData.allDay} name="all-day" id="all-day" 
              onChange={() => setFormData(f => ({...f, allDay: !f?.allDay}))} />
              <label htmlFor="all-day">All Day?</label>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="start-time">Start Time</label>
                <input 
                required={!formData.allDay}
                type="time" 
                name="start-time" 
                id="start-time" 
                max={formData.endTime}
                disabled={formData.allDay} 
                onChange={(e) => setFormData({...formData, startTime: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="end-time">End Time</label>
                <input 
                required={!formData.allDay}
                type="time" 
                name="end-time" 
                id="end-time" 
                min={formData.startTime}
                disabled={formData.allDay} 
                onChange={(e) => setFormData({...formData, endTime: e.target.value})} 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Color</label>
              <div className="row left">
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  id="blue"
                  checked={formData.color === 'blue'}
                  className="color-radio"
                  onChange={handleInputChange}
                />
                <label htmlFor="blue"><span className="sr-only">Blue</span></label>
                <input
                  type="radio"
                  name="color"
                  value="red"
                  id="red"
                  checked={formData.color === 'red'}
                  className="color-radio"
                  onChange={handleInputChange}
                />
                <label htmlFor="red"><span className="sr-only">Red</span></label>
                <input
                  type="radio"
                  name="color"
                  value="green"
                  id="green"
                  checked={formData.color === 'green'}
                  className="color-radio"
                  onChange={handleInputChange}
                />
                <label htmlFor="green"><span className="sr-only">Green</span></label>
              </div>
            </div>
            <div className="row">
              <button className="btn btn-success" type="submit">Add</button>
            </div>
          </form>
        </div>
    </div>
  )
}
