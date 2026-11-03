import React from 'react'
import Logout from "./Logout"
import { Link } from "react-router-dom"
import { flex, borderB, dynamicWidth, size, shadow, color } from '../styles'

const Nav = () => {
      const style = {
        ...flex,
        ...dynamicWidth,
        padding: `${size.sz6} ${size.sz6} ${size.sz4}`,
        fontWeight: "bold",
      }

      const styleB = {
        ...shadow,
        fontWeight: 'bold',
        display: 'inline-block',
        border: `double, ${size.sz2}`,
        borderRadius: size.sz2,
        padding: `${size.sz1} ${size.sz2}`,
        textShadow: `1px 1px 1px ${color.c1}`,
      }

    return (
      <nav style={borderB}>
        <div style={style}>
          <div style={flex}>
            <span style={ styleB } className="logo">B</span>
            <ul style={flex}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
            </ul>
          </div>
          <Logout />
        </div>
      </nav>
    )
}

export default Nav