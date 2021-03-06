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
    if (typeof updatedValue === 'function') {
      setBrixState(current => {
        const currentValue = current.getIn(path, notSetValue)
        const newValue = updatedValue(currentValue)
        return current.setIn(path, coerceDataToImmutable(newValue))
      })
    } else {
      setBrixState(current => current.setIn(path, coerceDataToImmutable(updatedValue)))
    }
  }

  return [value, set]
}
