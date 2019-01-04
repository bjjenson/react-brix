import React from 'react'

export const Form = ({ children }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      {children}
    </form>
  )
}
