import { useBrix } from './useBrix'
import { useWorker } from './useWorker'

export const useBrixWorker = (path, worker, notSetValue) => {
  const { value, set } = useBrix(path)
  if (value === undefined) {
    const result = useWorker(path, worker)
    set(result)
    return {
      value: notSetValue,
    }
  }
  return { value }
}
