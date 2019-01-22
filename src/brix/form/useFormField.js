import { useState } from 'react'
import { formatLabel } from './formatLabel'

/**
 * @param  args { import(".").IFormFieldArgs}
 */
export const useFormField = (initialValue, args = {}) => {
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

  const setValue = updatedValue => {
    setState({
      ...state,
      value: updatedValue,
      pristine: updatedValue === initialValue,
      ...tryValidate(updatedValue, state.touched),
    })
  }

  const handleChange = ({ target }) => {
    const value = args.valueFromTarget ? args.valueFromTarget(target) : target.value
    const coercedValue = args.normalize ? args.normalize(value) : value
    setValue(coercedValue)
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
    setValidationResult,
    setValue,
    validate,
  }
}
