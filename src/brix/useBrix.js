import { useContext } from 'react'
import { getBrixContext } from './BrixProvider'
import { coerceDataToImmutable } from './helpers'

export const useBrix = (path, notSetValue) => {
  const { state, setBrixState } = useContext(getBrixContext())
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
