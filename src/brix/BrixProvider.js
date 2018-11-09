import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'perpetual-js'

export const BrixContext = React.createContext({
  state: Map(),
})

export const BrixProvider = ({ value = Map(), children }) => {
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

export const BrixConsumer = BrixContext.Consumer
