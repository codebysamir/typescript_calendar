import React, { ReactNode, createContext, useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export type Modals = {
    isAddEventModalOpen: boolean,
    setIsAddEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEditEventModalOpen: boolean,
    setIsEditEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isShowAllEventModalOpen: boolean,
    setIsShowAllEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    eventDate: globalThis.Date | undefined,
    setEventDate: React.Dispatch<React.SetStateAction<globalThis.Date | undefined>>,
    eventData: EventForm[],
    setEventData: React.Dispatch<React.SetStateAction<EventForm[]>>,
    eventId: string,
    setEventId: React.Dispatch<React.SetStateAction<string>>,
}

export type EventForm = {
    id: string,
    date?: globalThis.Date,
    name: string,
    allDay?: boolean,
    startTime?: string,
    endTime?: string,
    color: "blue" | "red" | "green",
}

type Children = {
    children: ReactNode
}

const ModalsContext = createContext<Modals | null>(null)

export function useModalsContext() {
    const useModalsContext = useContext(ModalsContext)

    if (useModalsContext == null) {
        throw new Error('Use within Context Provider')
    }

    return useModalsContext
}

export default function ModalsProvider({ children }: Children) {
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
    const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false)
    const [isShowAllEventModalOpen, setIsShowAllEventModalOpen] = useState(false)
    const [eventDate, setEventDate] = useState<Date>()
    const [eventData, setEventData] = useLocalStorage<EventForm[]>('eventData', [])
    const [eventId, setEventId] = useState<string>('')

    const modals = {
        isAddEventModalOpen,
        setIsAddEventModalOpen,
        isEditEventModalOpen,
        setIsEditEventModalOpen,
        isShowAllEventModalOpen,
        setIsShowAllEventModalOpen,
        eventDate,
        setEventDate,
        eventData,
        setEventData,
        eventId,
        setEventId
    }
    
  return (
    <ModalsContext.Provider value={modals}>{children}</ModalsContext.Provider>
  )
}
