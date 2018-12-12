import { useContext } from 'react'
import { getBrixContext } from './BrixProvider'
import { coerceDataToImmutable } from './helpers'

export const useBrixSetter = () => {
  const { setBrixState } = useContext(getBrixContext())

  const set = (path, updatedValue) => {
    return setBrixState(state =>
      state.setIn(path, coerceDataToImmutable(updatedValue))
    )
  }
  return {
    set,
  }
}
