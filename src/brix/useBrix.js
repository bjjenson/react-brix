import { useContext } from 'react'
import { getBrixContext } from './BrixProvider'
import { coerceDataToImmutable } from './helpers'

export const useBrix = (path, notSetValue, customContext) => {
  let state, setState
  try {
    const context = useContext(customContext || getBrixContext())
    state = context.state
    setState = context.setState
  } catch (err) {
    throw new Error('BrixProvider is not configured correctly in the app')
  }
  if (!state) {
    throw new Error('Context must have state property')
  }
  if (!setState) {
    throw new Error('Context must have setState function')
  }

  const value = state.getIn(path, notSetValue)

  const set = updatedValue => {
    if (typeof updatedValue === 'function') {
      setState(current => {
        const currentValue = current.getIn(path, notSetValue)
        const newValue = updatedValue(currentValue)
        return current.setIn(path, coerceDataToImmutable(newValue))
      })
    } else {
      setState(current => current.setIn(path, coerceDataToImmutable(updatedValue)))
    }
  }

  return [value, set]
}
