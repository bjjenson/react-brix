import { useState } from 'react'
import { useFormTextField } from './formTextField'

jest.mock('react')

const setState = jest.fn()

let initialArgs, event
beforeEach(() => {
  initialArgs = {
    optional: false,
    value: 'the value',
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
  useFormTextField(initialArgs)
  expect(useState.mock.calls[0]).toMatchSnapshot()
})

test('defaults value to empty string', () => {
  useFormTextField()
  expect(useState.mock.calls[0]).toMatchSnapshot()
})

test('returns all props needed', () => {
  const actual = useFormTextField(initialArgs)
  expect(actual).toMatchSnapshot()
})

test('adds optional to label if not required', () => {
  const actual = useFormTextField({ label: 'the label', optional: true })
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
    const actual = useFormTextField(initialArgs)
    const e = {
      target: {
        value: '1',
      },
    }
    actual.props.onChange(e)
    expect(validate).toHaveBeenCalledWith('1', initialArgs.name)
  })

  test('does not updates state with results of validation if not "touched"', () => {
    const actual = useFormTextField(initialArgs)
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
    const actual = useFormTextField(initialArgs)
    const e = {
      target: {
        value: '1',
      },
    }

    validate.mockReturnValue('i am error')
    actual.props.onChange(e)
    expect(setState.mock.calls[0]).toMatchSnapshot()
  })

  test('validates onBlur', () => {
    const actual = useFormTextField({ ...initialArgs, value: '&' })
    actual.props.onBlur()
    expect(validate.mock.calls[0]).toMatchSnapshot()
  })

  test('sets required if empty on blur', () => {
    const actual = useFormTextField({ ...initialArgs, optional: false })
    actual.props.onBlur()
    expect(setState.mock.calls[0]).toMatchSnapshot()
  })

})

test('cancels pristine if initial value changed', () => {
  const actual = useFormTextField(initialArgs)
  actual.props.onChange(event)
  expect(setState.mock.calls[0]).toMatchSnapshot()
})

test('sets touched onBlur', () => {
  const actual = useFormTextField(initialArgs)
  actual.props.onBlur(event)
  expect(setState.mock.calls[0]).toMatchSnapshot()
})
