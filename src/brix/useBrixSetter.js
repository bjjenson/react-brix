import { useContext } from 'react'
import { BrixContext } from './BrixProvider'
import { coerceDataToImmutable } from './helpers'

export const useBrixSetter = () => {
  const { setState } = useContext(BrixContext)

  const set = (path, updatedValue) => {
    return setState(state =>
      state.setIn(path, coerceDataToImmutable(updatedValue))
    )
  }
  return {
    set,
  }
}
