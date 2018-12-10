import { useContext } from 'react'
import { getBrixContext } from './BrixProvider'
import { coerceDataToImmutable } from './helpers'

export const useBrixSetter = () => {
  const { setState } = useContext(getBrixContext())

  const set = (path, updatedValue) => {
    return setState(state =>
      state.setIn(path, coerceDataToImmutable(updatedValue))
    )
  }
  return {
    set,
  }
}
