import { useReducer, createContext, useState, useEffect } from "react";
import blogService from "./services/blogs"

const reducer = (state, action) => {

    switch (action.type) {
        case 'SET':
            return action.payload;
        case 'CLEAR':
            return null;
        default:
            return state
    }
}

const UserContext = createContext();

export const UserContextProvider = props => {
    const [user, dispatch] = useReducer(reducer, null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let storedUser = localStorage.getItem('user')
        if (storedUser) {
            storedUser = JSON.parse(storedUser)
            dispatch({ type: 'SET', payload: storedUser })
            blogService.setToken(storedUser.token)
        }
        setLoading(false)
    }, [])

    return (
        <UserContext.Provider value={{ user: [user, dispatch], loading }}>
            { props.children }
        </UserContext.Provider>
    )
}

export default UserContext;
