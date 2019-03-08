import { fromJS, Map } from 'immutable'
import { useReducer, useMemo } from 'react'
import { fieldReducer, initState, actions } from './fieldReducer'
import { defaultTextValue } from './fields/useTextField'
import { defaultSelectValue } from './fields/useSelectField'
import { defaultNumberValue } from './fields/useNumberField'
import { defaultBooleanValue } from './fields/useBooleanField'

export const createReducer = ({ fields, initialValues = Map() }) => {
  const derivedState = getInitialState(fields, initialValues)
  const [state, dispatch] = useReducer(fieldReducer, derivedState, initState)

  useMemo(() => {
    dispatch(actions.reset(derivedState))
    return initialValues
  }, [initialValues])

  return [state, dispatch]
}

/**
 * @param fields {Array<import("../form").IFormFieldArgs>}
 */
const getInitialState = (fields, initialValues) => {
  const fieldMap = fields.reduce((acc, field) => {
    return acc.set(field.name, generateDefaultFieldState(field, initialValues))
  }, Map())

  return fieldMap
}

export const generateDefaultFieldState = (field, initialValues) => {
  if (!field.name) throw new Error('name is required on field')

  const value = getInitialValue(field.value, initialValues.get(field.name), field.type)


  return fromJS({
    initial: {
      type: field.type || 'text',
      value,
      optional: field.optional || false,
      label: field.label,
    },
    current: {
      helperText: field.helperText || '',
      error: false,
      pristine: true,
      touched: false,
      value,
    },
  }).setIn(['initial', 'field'], field)
}

const defaultValues = {
  text: defaultTextValue,
  select: defaultSelectValue,
  number: defaultNumberValue,
  boolean: defaultBooleanValue,
}

const getInitialValue = (fieldValue, initialValue, type = 'text') => {
  if (initialValue) {
    return initialValue
  }
  if (fieldValue) {
    return fieldValue
  }
  return defaultValues[type]
}
