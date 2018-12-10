import { useContext } from 'react'
import { getBrixContext } from './BrixProvider'
import { coerceDataToImmutable } from './helpers'

export const useBrix = (path, notSetValue) => {
  const { state, setState } = useContext(getBrixContext())
  const value = state.getIn(path, notSetValue)

  const update = updatedValue => {
    setState(currState => currState.setIn(path, coerceDataToImmutable(updatedValue)))
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
