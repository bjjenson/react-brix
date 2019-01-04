import { Map } from 'immutable'
import { Form } from './Form'
import {
  useBooleanField,
  useNumberField,
  useSelectField,
  useTextField,
} from './fields'

/**
 * 
 * @param  param0 { import(".").IFormProps }
 */
export const useForm = ({ fields, submit, validate, initialValues = Map() }) => {
  const fieldData = fields.reduce((acc, f) => {
    if (!f.name) throw new Error('name is required on field')

    const initialValue = initialValues.get(f.name)
    switch (f.type) {
      case 'select':
        acc[f.name] = useSelectField(f, initialValue)
        break
      case 'boolean':
        acc[f.name] = useBooleanField(f, initialValue)
        break
      case 'number':
        acc[f.name] = useNumberField(f, initialValue)
        break
      case 'text':
      default:
        acc[f.name] = useTextField(f, initialValue)
        break
    }
    return acc
  }, {})

  const tryValidateForm = () => {
    if (validate) {
      const values = getFieldValues(fieldData)
      return validate(values)
    }

    return {}
  }

  const trySubmitForm = () => {
    let isFormValid = true
    const formResults = tryValidateForm()
    const values = Object.entries(fieldData).reduce((acc, [key, v]) => {
      acc[key] = v.props.value
      if (formResults[key]) {
        v.setValidationResult({ error: true, helperText: formResults[key] })
        isFormValid = false
      }
      const isFieldValid = v.validate()
      isFormValid = isFormValid && isFieldValid
      return acc
    }, initialValues.toJS())
    if (isFormValid) {
      submit(values)
    }
  }

  return {
    ...getFieldProps(fieldData),
    submit: trySubmitForm,
    Form,
  }
}

const getFieldValues = (fieldData) => {
  return Object.entries(fieldData).reduce((acc, [k, v]) => {
    acc[k] = v.props.value
    return acc
  }, {})
}

const getFieldProps = (fieldData) => {
  return Object.entries(fieldData).reduce((acc, [k, v]) => {
    acc[k] = v.props
    return acc
  }, {})
}
