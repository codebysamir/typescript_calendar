import { useEffect, useState } from 'react'



const saveValue = (key: string, value: any) => {
    console.log(key, value)
    localStorage.setItem(key, JSON.stringify(value))
}

const getValue = (key: string, defaultValue: any) => {
    const storageItem = localStorage.getItem(key)
    if (!storageItem) return defaultValue
    let savedValue = JSON.parse(storageItem)
    if (savedValue instanceof Array && savedValue[0]?.date) savedValue = savedValue.map(obj => ({...obj, date: new Date(obj.date)})) 
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