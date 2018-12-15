import { useContext } from 'react'
import { getBrixContext } from './BrixProvider'
import { coerceDataToImmutable } from './helpers'

export const useBrix = (path, notSetValue) => {
  let state, setBrixState
  try {
    const context = useContext(getBrixContext())
    state = context.state
    setBrixState = context.setBrixState
  } catch (err) {
    throw new Error('BrixProvider is not configured correctly in the app')

  }
  const value = state.getIn(path, notSetValue)

  const set = updatedValue => {
    setBrixState(current => current.setIn(path, coerceDataToImmutable(updatedValue)))
  }

  return {
    value,
    set,
    cnx: {
      value,
      onChange: e => set(e.target.value),
    },
  }

}
