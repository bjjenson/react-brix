import { useFormField } from '../useFormField'

export const useSelectField = (args = {}, initial) => {
  const initialValue = initial || args.value || ''

  const fieldProps = useFormField(initialValue, args)
  fieldProps.props.options = args.options
  return fieldProps
}
