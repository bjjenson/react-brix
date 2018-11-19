import { useContext } from 'react'
import { useBrix } from './useBrix'
import { useWorker } from './useWorker'
import { BrixContext } from './BrixProvider'

export const useBrixWorker = (path, worker, notSetValue, transformer = v => v) => {
  const { value, set } = useBrix(path)
  const { state } = useContext(BrixContext)
  if (value === undefined) {
    const getState = () => {
      return state
    }

    const result = useWorker(path, () => worker(getState))
    set(transformer(result))

    return {
      value: notSetValue,
    }
  }

  return { value }
}
