import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const url = "https://backend-project-3-chi.vercel.app";
const userContext = createContext(null);

export function UserProvider({ children }) {
    const [allUser, setAllUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${url}/users`);
                setAllUser(res.data);
            } catch (error) {
                console.error("UserContext Fetch Error:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    return (
        <userContext.Provider value={{ allUser, loading, error }}>
            {children}
        </userContext.Provider>
    );
}

export function useUsers() {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("useUsers must be used within a UserProvider");
    }
    return context;
}