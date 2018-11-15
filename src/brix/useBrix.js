import { useContext } from 'react'
import { BrixContext } from './BrixProvider'
import { coerceDataToImmutable } from './helpers'

export const useBrix = (path, notSetValue) => {
  const { state, setState } = useContext(BrixContext)
  const value = state.data.getIn(path, notSetValue)

  const update = updatedValue => {
    state.data = state.data.setIn(path, coerceDataToImmutable(updatedValue))
    setState(state)
  }

  return {
    value,
    set: update,
    cnx: {
      value,
      onChange: e => update(e.target.value),
    },
  }
}
