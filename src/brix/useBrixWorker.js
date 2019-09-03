import { useContext } from 'react'
import { useBrix } from './useBrix'
import { useWorker } from './useWorker'
import { getBrixContext } from './BrixProvider'

export const useBrixWorker = (path, worker, notSetValue, transformer = v => v, customContext) => {
  const [value, set] = useBrix(path, undefined, customContext)
  const { state } = useContext(customContext || getBrixContext())
  if (value === undefined) {
    const getState = () => {
      return state
    }

    const result = useWorker(path, () => worker(getState))
    const safeResult = result == null ? notSetValue : result
    set(transformer(safeResult))

    return notSetValue
  }

  return value
}
