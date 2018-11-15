import { useContext } from 'react'
import { BrixContext } from './BrixProvider'
import { coerceDataToImmutable } from './helpers'

export const useBrixSetter = () => {
  const { state, setState } = useContext(BrixContext)

  const set = (path, updatedValue) => {
    state.data = state.data.setIn(path, coerceDataToImmutable(updatedValue))
    setState(state)
  }
  return {
    set,
  }
}
