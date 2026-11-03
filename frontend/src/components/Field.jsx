import React from 'react'

const Field = ({ attributes }) => {
  return (
    <div>
        <label htmlFor={ attributes.id }>
        {attributes.name[0].toUpperCase() + attributes.name.slice(1)}:
        </label>
        <input { ...attributes } />
    </div>
  )
}

export default Field