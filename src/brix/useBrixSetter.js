import { useContext } from 'react'
import { BrixContext } from './BrixProvider'
import { coerceDataToImmutable } from './helpers'

export const useBrixSetter = () => {
  const { state, setState } = useContext(BrixContext)

  const update = (path, updatedValue) =>
    setState(state.setIn(path, coerceDataToImmutable(updatedValue)))

  return {
    set: update,
  }
}
