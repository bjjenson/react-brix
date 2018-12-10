import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

const BrixContext = React.createContext({
  state: Map(),
})

export const BrixProvider = ({ value, children }) => {
  const [state, setState] = useState(value)

  return (
    <BrixContext.Provider value={{ state, setState }}>
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

export const getBrixContext = () => {
  return BrixContext
}

export const getBrixConsumer = () => {
  return BrixContext.Consumer
}
