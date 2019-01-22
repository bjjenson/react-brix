import { useState } from 'react'
import { useFormField } from './useFormField'

jest.mock('react')

const setState = jest.fn()

let initialArgs, event, value
beforeEach(() => {
  value = 'the value'
  initialArgs = {
    optional: false,
    error: 'on',
    helperText: 'the help',
    label: 'the label',
  }
  event = {
    target: {
      value: '&',
    },
  }

  useState.mockImplementation(a => [a, setState])
})

test('sets initial values', () => {
  useFormField(value, initialArgs)
  expect(useState.mock.calls[0]).toMatchSnapshot()
})

test('returns all props needed', () => {
  const actual = useFormField(value, initialArgs)
  expect(actual).toMatchSnapshot()
})

test('adds optional to label if not required', () => {
  const actual = useFormField(value, { label: 'the label', optional: true })
  expect(actual).toMatchSnapshot()
})

describe('validate', () => {
  let validate
  beforeEach(() => {
    validate = jest.fn()
    initialArgs = {
      name: 'field.name',
      validate,
    }
  })

  test('calls validate on change', () => {
    const actual = useFormField(value, initialArgs)
    const e = {
      target: {
        value: '1',
      },
    }
    actual.props.onChange(e)
    expect(validate).toHaveBeenCalledWith('1', initialArgs.name)
  })

  test('does not updates state with results of validation if not "touched"', () => {
    const actual = useFormField(value, initialArgs)
    const e = {
      target: {
        value: '1',
      },
    }
    validate.mockReturnValue('i am error')
    actual.props.onChange(e)
    expect(setState.mock.calls[0]).toMatchSnapshot()
  })

  test('updates state with results of validation if "touched"', () => {
    useState.mockReturnValue([{ touched: true }, setState])
    const actual = useFormField(value, initialArgs)
    const e = {
      target: {
        value: '1',
      },
    }

    validate.mockReturnValue('i am error')
    actual.props.onChange(e)
    expect(setState).toHaveBeenCalledTimes(1)
    expect(setState.mock.calls[0]).toMatchSnapshot()
  })

  test('validates onBlur', () => {
    const actual = useFormField('&', { ...initialArgs })
    actual.props.onBlur()
    expect(validate.mock.calls[0]).toMatchSnapshot()
  })

  test('sets required if empty on blur', () => {
    const actual = useFormField('', { ...initialArgs, optional: false })
    actual.props.onBlur()
    expect(setState.mock.calls[0]).toMatchSnapshot()
  })

  test('validate directly', () => {
    const actual = useFormField('', { ...initialArgs })
    actual.validate()
    expect(setState.mock.calls[0]).toMatchSnapshot()
  })

})

test('cancels pristine if initial value changed', () => {
  const actual = useFormField(value, initialArgs)
  actual.props.onChange(event)
  expect(setState.mock.calls[0]).toMatchSnapshot()
})

test('sets touched onBlur', () => {
  const actual = useFormField(value, initialArgs)
  actual.props.onBlur(event)
  expect(setState.mock.calls[0]).toMatchSnapshot()
})

test('handleChange uses valueFromTarget to get value from target', () => {
  const valueFromTarget = target => target.nonValue

  const actual = useFormField(value, { valueFromTarget })
  actual.props.onChange({ target: { nonValue: 'yolo' } })
  expect(setState.mock.calls[0]).toMatchSnapshot()
})

test('setValue updates the value of the field', () => {
  const { setValue } = useFormField(value)
  setValue('new value')
  expect(setState.mock.calls[0]).toMatchSnapshot()
})
