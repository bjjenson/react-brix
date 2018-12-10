import { useState } from 'react'
import { formatLabel } from './formatLabel'
/**
 * @param  args { import(".").IFormTextFieldArgs}
 */
export const useFormTextField = (args = {}) => {
  const initialValue = args.value || ''
  const requiredMessage = args.requiredMessage || 'Required'

  const [state, setState] = useState({
    value: initialValue,
    error: false,
    helperText: args.helperText,
    pristine: true,
    touched: false,
  })

  const tryValidate = (value, touched) => {
    let result
    if (args.validate) {
      result = args.validate(value, args.name)
    }

    if (!Boolean(result) && !args.optional && touched && value === '') {
      result = requiredMessage
    }

    return touched ? {
      error: Boolean(result),
      helperText: result,
    } : {
        error: state.error,
        helperText: state.helperText,
      }
  }

  const handleChange = ({ target }) => {
    const coercedValue = args.normalize ? args.normalize(target.value) : target.value
    setState({
      ...state,
      value: coercedValue,
      pristine: coercedValue === initialValue,
      ...tryValidate(coercedValue, state.touched),
    })
  }

  const onBlur = () => {
    setState({
      ...state,
      touched: true,
      ...tryValidate(state.value, true),
    })
  }

  const onFocus = () => {
  }

  const validate = () => {
    const result = tryValidate(state.value, true)
    if (result.error) {
      setState({
        ...state,
        ...result,
      })
      return false
    }
    return true
  }

  return {
    props: {
      error: state.error,
      helperText: state.helperText,
      label: formatLabel(args.label, args.optional),
      value: state.value,
      // handlers
      onBlur,
      onChange: handleChange,
      onFocus,
    },
    validate,
  }
}
