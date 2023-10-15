import { useState, useEffect, useCallback } from 'react'

let timer

export const useAuthorize = () => {

    const [token, setToken] = useState(false)  
    
    const [userId, setUserId] = useState(false)

    const [tokenExpire, setExpire] = useState(null)

    const login = useCallback((id, token, status) => {
        setToken(token) 
        setUserId(id)
        //check token status
        const expire = status || (new Date(new Date().getTime() + 1000 * 60 * 60))
        setExpire(expire)
        localStorage.setItem('user', JSON.stringify({ userId: id, token: token, expiration: expire.toISOString() }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setExpire(null)
        localStorage.removeItem('user')
    }, [])

    //Log Time
    useEffect(() => {
        if (token && (tokenExpire)) {
            const timeout = tokenExpire.getTime() - new Date().getTime()
            timer = setTimeout(logout, timeout)
        } else clearTimeout(timer)
    }, [token, logout, tokenExpire])

    //Auto-Login
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('user'))
        if (stored && (stored.token) && (new Date(stored.expiration) > new Date())) {
            login(stored.userId, stored.token, new Date(stored.expiration)) 
        }
    }, [login])

    return { userId, token, login, logout }

}
