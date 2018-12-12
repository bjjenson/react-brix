import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

const BrixContext = React.createContext()

export const BrixProvider = ({ value, children }) => {
  const [state, setBrixState] = useState(value)

  return (
    <BrixContext.Provider value={{ state, setBrixState }}>
      {children}
    </BrixContext.Provider>
  )
}

BrixProvider.propTypes = {
  value: PropTypes.object,
}

BrixProvider.defaultProps = {
  value: Map(),
}

export function getBrixContext() {
  return BrixContext
}

export function getBrixConsumer() {
  return BrixContext.Consumer
}
