import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const CustomContext = React.createContext()

export const CustomProvider = ({ value, children }) => {
  const [state, setState] = useState(value)

  return (
    <CustomContext.Provider value={{ state, setState }}>
      {children}
    </CustomContext.Provider>
  )

}

CustomProvider.propTypes = {
  value: PropTypes.any.isRequired,
}
