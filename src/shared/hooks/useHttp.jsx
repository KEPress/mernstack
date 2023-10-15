/* eslint-disable no-array-constructor */
import { useRef, useState, useEffect, useCallback } from 'react'

export const useHttp = () => {

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    const active = useRef(Array())

    const sendRequest = useCallback( async (url, method = 'GET', body = null, headers = Object()) => {
            
        setLoading(true)
        const abortControl = new AbortController()
        active.current.push(abortControl)
        try {
            const response = await fetch(url, { method, body, headers, signal: abortControl.signal })
            const data = await response.json()
            active.current = active.current.filter((requestControl) => requestControl !== abortControl)
            if (!response.ok) throw new Error(data.message)
            setLoading(false)
            return data
        } catch (error) {
            if (error.name !== 'AbortError') {
                setError(error.message)
                throw error
            }
        } finally {
            setLoading(false)
        }      
    }, []) 

    const clearError = () => setError(null)

    useEffect(() => {
        return () => active.current.forEach((abortControl) => abortControl.abort())
    }, [])

    return { loading, error, sendRequest, clearError }
}
