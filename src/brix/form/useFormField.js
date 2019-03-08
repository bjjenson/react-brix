import { formatLabel } from './formatLabel'
import { actions } from './fieldReducer'
/**
 * @param  fieldArgs { import("../form").IFormFieldArgs}
 * @returns {import("../form").IFormField}
 */
export const useFormField = (state, dispatch, fieldArgs = {}) => {
  const requiredMessage = fieldArgs.requiredMessage || 'Required'

  const tryValidate = (value, touched) => {
    let result
    if (value && fieldArgs.validate) {
      result = fieldArgs.validate(value, fieldArgs.name, state.get('getAllValues'))
    }

    if (!Boolean(result) && !fieldArgs.optional && touched && value === '') {
      result = requiredMessage
    }

    if (touched) {
      dispatch(actions.validationResult(fieldArgs.name, Boolean(result), result))
    }
    return !Boolean(result)
  }

  const setValue = v => {
    dispatch(actions.updateValue(fieldArgs.name, v))
    tryValidate(v, state.get('touched'))
  }

  const onChange = ({ target }) => {
    const value = fieldArgs.valueFromTarget ? fieldArgs.valueFromTarget(target) : target.value
    const coercedValue = fieldArgs.normalize ? fieldArgs.normalize(value) : value
    setValue(coercedValue)
  }

  const onBlur = () => {
    dispatch(actions.touched(fieldArgs.name))
    tryValidate(state.get('value'), true)
  }

  const setValidationResult = result => {
    dispatch(actions.validationResult(fieldArgs.name, true, result))
  }

  const validate = () => {
    return tryValidate(state.get('value'), true)
  }

  return {
    props: {
      error: state.get('error'),
      helperText: state.get('helperText'),
      label: formatLabel(fieldArgs.label, fieldArgs.optional),
      value: state.get('value'),
      // handlers
      onBlur,
      onChange,
    },
    setValidationResult,
    setValue,
    validate,
  }
}
