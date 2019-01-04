import { useFormField } from '../useFormField'

export const useNumberField = (args = {}, initial) => {
  let initialValue
  if (initial !== undefined) {
    initialValue = initial
  } else if (args.value !== undefined) {
    initialValue = args.value
  } else {
    initialValue = 0
  }

  return useFormField(initialValue, args)
}
