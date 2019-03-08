import { fromJS } from 'immutable'
import { useFormField } from './useFormField'
import { actionTypes } from './fieldReducer'

jest.mock('react')

const dispatch = jest.fn()
let value, initialArgs, state
beforeEach(() => {
  value = 'the value'
  initialArgs = {
    name: 'fieldName',
    optional: false,
    error: 'on',
    helperText: 'the help',
    label: 'the label',
  }

  state = fromJS({
    value,
    error: false,
    pristine: true,
    touched: false,
    helperText: initialArgs.helperText,
  })
})

test('returns all props needed', () => {
  expect(useFormField(state, dispatch, initialArgs)).toMatchSnapshot()
})

test('adds optional to label if not required', () => {
  const actual = useFormField(state, dispatch, { label: 'the label', optional: true })
  expect(actual).toMatchSnapshot()
})

describe('onChange', () => {
  let event
  beforeEach(() => {
    event = {
      target: {
        value: 'updated',
      },
    }
  })

  test('dispatches change action', () => {
    const { props: { onChange } } = useFormField(state, dispatch, initialArgs)
    onChange(event)

    expect(dispatch.mock.calls[0]).toMatchSnapshot()
  })

  test('uses valueFromTarget to coerce value if provided', () => {
    const valueFromTarget = jest.fn()
    valueFromTarget.mockReturnValue('updatedFromTarget')
    const { props: { onChange } } = useFormField(state, dispatch, { ...initialArgs, valueFromTarget })
    onChange(event)

    expect(dispatch.mock.calls[0]).toMatchSnapshot()
    expect(valueFromTarget).toHaveBeenCalledWith(event.target)
  })

  test('coerces value using normalize', () => {
    const normalize = jest.fn()
    normalize.mockReturnValue('normalized value')
    const { props: { onChange } } = useFormField(state, dispatch, { ...initialArgs, normalize })
    onChange(event)

    expect(dispatch.mock.calls[0]).toMatchSnapshot()
    expect(normalize).toHaveBeenCalledWith(event.target.value)
  })
})

describe('validate', () => {
  const validate = jest.fn()
  let event
  beforeEach(() => {
    initialArgs = { ...initialArgs, validate }
    event = {
      target: {
        value: '1',
      },
    }
    state = fromJS({
      value,
      error: false,
      pristine: false,
      touched: true,
      helperText: initialArgs.helperText,
    })
  })

  test('calls validate on change', () => {
    const { props: { onChange } } = useFormField(state, dispatch, initialArgs)
    onChange(event)

    expect(validate).toHaveBeenCalledWith(event.target.value, initialArgs.name)
  })

  test('does not set error if not "touched"', () => {
    state = fromJS({
      value,
      error: false,
      pristine: false,
      touched: false,
      helperText: initialArgs.helperText,
    })
    validate.mockReturnValue('Error here')

    const { props: { onChange } } = useFormField(state, dispatch, initialArgs)
    onChange(event)

    expect(dispatch).not.toHaveBeenCalledWith({
      type: actionTypes.validationResult,
      payload: {
        error: true,
        helperText: expect.any(String),
      },
    })

  })

  test('sets validation result if "touched"', () => {
    validate.mockReturnValue('Error here')

    const { props: { onChange } } = useFormField(state, dispatch, initialArgs)
    onChange(event)

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.validationResult,
      fieldName: 'fieldName',
      payload: {
        error: true,
        helperText: expect.any(String),
      },
    })

  })

  test('validates onBlur', () => {
    validate.mockReturnValue('Error here')

    const { props: { onBlur } } = useFormField(state, dispatch, initialArgs)
    onBlur()

    expect(validate).toHaveBeenCalled()
  })

  test('sets required if empty on blur', () => {
    state = fromJS({
      value: '',
      error: false,
      pristine: false,
      touched: true,
      helperText: initialArgs.helperText,
    })

    const { props: { onBlur } } = useFormField(state, dispatch, initialArgs)
    onBlur()

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.validationResult,
      fieldName: 'fieldName',
      payload: {
        error: true,
        helperText: expect.any(String),
      },
    })
  })

  test('validate directly', () => {
    state = fromJS({
      value: '',
      error: false,
      pristine: false,
      touched: false,
      helperText: initialArgs.helperText,
    })

    const actual = useFormField(state, dispatch, initialArgs)

    const isValid = actual.validate()

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.validationResult,
      fieldName: 'fieldName',
      payload: {
        error: true,
        helperText: 'Required',
      },
    })
    expect(isValid).toBeFalsy()
  })

  test('validate directly returns true if valid', () => {
    validate.mockReturnValue('')
    const actual = useFormField(state, dispatch, initialArgs)

    const isValid = actual.validate()

    expect(isValid).toBeTruthy()
  })

})

test('setValidationResult externally', () => {
  const { setValidationResult } = useFormField(state, dispatch, initialArgs)

  setValidationResult('i am error')
  expect(dispatch).toHaveBeenCalledWith({
    type: actionTypes.validationResult,
    fieldName: 'fieldName',
    payload: {
      error: true,
      helperText: 'i am error',
    },
  })
})

test('sets touched onBlur', () => {
  const { props: { onBlur } } = useFormField(state, dispatch, initialArgs)
  onBlur()

  expect(dispatch).toHaveBeenCalledWith({
    fieldName: 'fieldName',
    type: actionTypes.touched,
  })
})

test('setValue sets value externally', () => {
  const { setValue } = useFormField(state, dispatch, initialArgs)

  setValue('i am value')
  expect(dispatch).toHaveBeenCalledWith({
    type: actionTypes.updateValue,
    fieldName: 'fieldName',
    payload: 'i am value',
  })
})

