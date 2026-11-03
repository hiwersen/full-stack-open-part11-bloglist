import React from 'react'

const Divider = () => {
  return (
    <div className="form-width">
        <div style={divider} >
            <span style={line} /><span>or</span><span style={line} />
        </div>
        <div style={link}>
            <a onClick={() => { setToggle(!toggle); }} >
            {toggle ? hideByDefault : showByDefault}
            </a>
        </div>
    </div>
  )
}

export default Divider