import { useState } from 'react'
import { fromJS } from 'immutable'
import { useForm } from './useForm'

jest.mock('react')

const setState = jest.fn()
const submitWorker = jest.fn()
let formArgs
beforeEach(() => {
  formArgs = [
    { name: 'name', type: 'text', label: 'The name' },
    { name: 'phone', type: 'text', label: 'The phone' },
  ]

  useState.mockImplementation(a => [a, setState])
})

test('returns array of form props', () => {
  const actual = useForm({ fields: formArgs })
  expect(actual).toMatchSnapshot()
})

test('throws if name is not set', () => {
  delete formArgs[0].name
  expect(() => useForm({ fields: formArgs })).toThrow()
})

test('no submit if field validation fails', () => {
  const validateName = jest.fn()
  validateName.mockReturnValue('name has error')
  formArgs[0].validate = validateName

  const actual = useForm({ fields: formArgs, worker: submitWorker })
  actual.submit()
  expect(submitWorker).not.toHaveBeenCalled()
})

test('no submit if form validation fails', () => {
  const validateForm = jest.fn()
  validateForm.mockReturnValue({ name: 'i am error' })
  const actual = useForm({ fields: formArgs, worker: submitWorker, validate: validateForm })
  actual.submit()
  expect(validateForm.mock.calls[0]).toMatchSnapshot()
  expect(submitWorker).not.toHaveBeenCalled()
})

test('submit calls worker, merges with initialValues', () => {
  formArgs = [
    { name: 'name' },
    { name: 'phone', value: 'b' },
  ]
  const initialValues = fromJS({
    name: 'a',
    id: 'id',
  })
  const actual = useForm({ fields: formArgs, submit: submitWorker, initialValues })
  actual.submit()
  expect(submitWorker.mock.calls[0]).toMatchSnapshot()
})
