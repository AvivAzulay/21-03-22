import { useEffect, useState } from "react";

function getSavedData(key, initialData) {
    const savedData = JSON.parse(localStorage.getItem(key))
    if (savedData) return savedData

    if (initialData instanceof Function) return initialData()
    return initialData
}

export default function useLocalStorage(key, initialData) {
    const [data, setData] = useState(() => {
        return getSavedData(key, initialData)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data))
    }, [data])

    return [data, setData]
}