import { createContext } from 'react'

export const Context = createContext({ 
    online: false, 
    token: null, 
    userId: null, 
    login: () => {}, 
    logout: () => {} 
})
