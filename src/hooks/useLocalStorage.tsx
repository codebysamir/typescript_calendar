import { useEffect, useState } from 'react'
import type { EventForm } from '../context/ModalsContext'


const saveValue = <T,>(key: string, value: T) => {
    console.log(key, value)
    localStorage.setItem(key, JSON.stringify(value))
}

const getValue = <T,>(key: string, defaultValue: T) => {
    const storageItem = localStorage.getItem(key)
    if (!storageItem) return defaultValue
    let savedValue: T | EventForm[] = JSON.parse(storageItem)
    if (Array.isArray(savedValue) && savedValue.length > 0 && typeof savedValue[0] === 'object' && savedValue[0] != null && 'date' in savedValue[0]) savedValue = savedValue.map(obj => (obj.date && {...obj, date: new Date(obj.date)})) as EventForm[]
    console.log(savedValue)
    if (savedValue) return savedValue
    if (defaultValue instanceof Function) return defaultValue()
    return defaultValue
}

export default function useLocalStorage<T>(storageKey: string, defaultValue: T) {
    const [value, setValue] = useState(() => getValue(storageKey, defaultValue))
    console.log(value)

    useEffect(() => {
        saveValue(storageKey, value)
    }, [value])

    return ([value, setValue])
}