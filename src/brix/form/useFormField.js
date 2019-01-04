import { useState } from 'react'
import { formatLabel } from './formatLabel'

/**
 * @param  args { import(".").IFormFieldArgs}
 */
export const useFormField = (value, args = {}) => {
  const requiredMessage = args.requiredMessage || 'Required'

  const [state, setState] = useState({
    value,
    error: false,
    helperText: args.helperText,
    pristine: true,
    touched: false,
  })

  const tryValidate = (value, touched) => {
    let result
    if (value && args.validate) {
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
    const value = args.valueFromTarget ? args.valueFromTarget(target) : target.value
    const coercedValue = args.normalize ? args.normalize(value) : value
    setState({
      ...state,
      value: coercedValue,
      pristine: coercedValue === value,
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

  const setValidationResult = result => {
    setState({
      ...state,
      ...result,
    })
  }

  const validate = () => {
    const result = tryValidate(state.value, true)
    if (result.error) {
      setValidationResult(result)
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
    setValidationResult,
  }
}
