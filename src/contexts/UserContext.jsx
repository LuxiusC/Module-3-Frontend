import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const url = 'http://localhost:3000'
const userContext = createContext(null)

export function UserProvider({ children }) {
    const [allUser, setAllUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${url}/users`)
                setAllUser(res.data)
            } catch (error) {
                console.error(error.message)
                setError(error.message)
            } finally {
                setLoading(true)
            }
        }
        getUsers()
    }, [])

    return (
        <userContext.Provider value={{ allUser, loading, error }}>
            {children}
        </userContext.Provider>
    )
}

export function useUsers() {
    const context = useContext(userContext)
    if (!context) {
        throw new Error("Must be used within a provider")
    }
    return context
}