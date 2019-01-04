import { useFormField } from '../useFormField'

/**
 * @param  args { import("..").IFormFieldArgs}
 * @param  initial String
 */
export const useTextField = (args = {}, initial) => {
  const initialValue = initial || args.value || ''

  return useFormField(initialValue, args)
}
