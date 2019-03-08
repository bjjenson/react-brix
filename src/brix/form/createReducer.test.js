import { fromJS } from 'immutable'
import { useReducer, useMemo } from 'react'
import { createReducer } from './createReducer'

jest.mock('react')

let state, fields, initialValues, dispatch
beforeEach(() => {
  dispatch = 'dispatch'
  state = fromJS({
    first: {
      initial: {
        label: 'First',
      },
    },
  })
  fields = [
    { name: 'first', label: 'First' },
    { name: 'second', label: 'Second', type: 'boolean' },
  ]
  initialValues = fromJS({
    first: 'firstValue',
    second: 'secondValue',
  })

  useReducer.mockReturnValue([state, dispatch])
})

test('prepares initialState by field', () => {
  expect(createReducer({ fields, initialValues })).toMatchSnapshot()
  expect(useReducer.mock.calls[0]).toMatchSnapshot()
})

test('throws error if name not provided', () => {
  fields.push({ label: 'Third' })
  expect(() => createReducer({ fields, initialValues })).toThrowErrorMatchingSnapshot()
})

test('adds helperText from field config', () => {
  fields[0].helperText = 'i am helper'
  createReducer({ fields, initialValues })
  expect(useReducer.mock.calls[0]).toMatchSnapshot()
})

test('sets optional on field', () => {
  fields[0].optional = true
  createReducer({ fields, initialValues })
  expect(useReducer.mock.calls[0]).toMatchSnapshot()
})

describe('initialValues', () => {
  test('field.value should used if set', () => {
    fields = [
      { name: 'first', type: 'text', value: 'i am field value' },
    ]
    createReducer({ fields })
    expect(useReducer.mock.calls[0]).toMatchSnapshot()
  })

  test('text', () => {
    fields = [
      { name: 'first', type: 'text' },
    ]
    createReducer({ fields })
    expect(useReducer.mock.calls[0]).toMatchSnapshot()
  })

  test('select', () => {
    fields = [
      { name: 'first', type: 'select' },
    ]
    createReducer({ fields })
    expect(useReducer.mock.calls[0]).toMatchSnapshot()
  })

  test('number', () => {
    fields = [
      { name: 'first', type: 'number' },
    ]
    createReducer({ fields })
    expect(useReducer.mock.calls[0]).toMatchSnapshot()
  })

  test('boolean', () => {
    fields = [
      { name: 'first', type: 'boolean' },
    ]
    createReducer({ fields })
    expect(useReducer.mock.calls[0]).toMatchSnapshot()
  })

})

test('uses memo to check for initialValues change', () => {
  createReducer({ fields, initialValues })
  expect(useMemo.mock.calls[0]).toMatchSnapshot()
})

test('useMemo update dispatches reset', () => {
  let memoized
  dispatch = jest.fn()
  useMemo.mockImplementation((f) => {
    memoized = f
  })
  useReducer.mockReturnValue([state, dispatch])

  createReducer({ fields, initialValues })
  memoized()

  expect(dispatch.mock.calls[0]).toMatchSnapshot()
})
