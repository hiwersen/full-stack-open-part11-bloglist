import React from 'react'
import { useUsersQuery } from '../hooks/index'
import { Link } from "react-router-dom"
import { flex, listStyle, size } from '../styles'
import Subheading from './Subheading'

const Users = () => {
  const { users } = useUsersQuery();

  const style = {
    ...flex,
    padding: `${size.sz7} 0`,
  }

  return (
    <section>
      <Subheading text="Users" />
      <div style={style}>
        <div style={{ flex: 2 }}>
          <h3>Name</h3>
          <ul>
          { users.map(user => (
              <li style={listStyle} key={user.id}>
                <Link to={`/users/${user.id}`}>{user?.name || user.username}</Link>
              </li>
            )) }
          </ul>
        </div>
        <div>
          <h3>Blogs Created</h3>
          <ul>
            { users.map(user => (
              <li style={listStyle} key={user.id}>{user.blogs.length}</li>
            )) }
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Users