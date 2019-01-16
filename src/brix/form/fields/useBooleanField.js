import { useFormField } from '../useFormField'

export const useBooleanField = (args = {}, initial) => {
  let initialValue
  if (initial !== undefined) {
    initialValue = initial
  } else if (args.value !== undefined) {
    initialValue = args.value
  } else {
    initialValue = false
  }

  const valueFromTarget = target => target.checked

  const result = useFormField(initialValue, { ...args, valueFromTarget })
  result.props.checked = result.props.value
  return result
}
