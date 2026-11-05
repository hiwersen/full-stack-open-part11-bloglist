import { useReducer, createContext } from 'react'
import blogService from './services/blogs'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

const initUser = () => {
  const storedUser = localStorage.getItem('user')

  if (!storedUser) return null

  const user = JSON.parse(storedUser)
  blogService.setToken(user.token)

  return user
}

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(reducer, null, initUser)

  return (
    <UserContext.Provider value={{ user: [user, dispatch] }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
