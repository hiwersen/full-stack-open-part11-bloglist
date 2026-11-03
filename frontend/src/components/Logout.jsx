import React from 'react';
import { useAuth, useUserValue } from '../hooks';
import { flex, color, size } from '../styles';

const Logout = () => {
    const { logout } = useAuth();
    const user = useUserValue();
    const name = (user?.name || user?.username || 'Anonymous').split(' ')[0];

    const divStyle = {
        ...flex,
        fontWeight: "bold",
        gap: size.sz3,
    };

    const nameStyle = {
        color: color.c2,
    }

    const btn = {
        color: 'initial',
        borderColor: 'initial',
    }

    return user && (
        <div style={divStyle}>
            <span>
            Hi, <span style={nameStyle}>{name}</span>!
            </span>
            <input
                style={btn}
                type="button"
                value="Log out"
                onClick={logout}
            />
        </div>
    )
}

export default Logout