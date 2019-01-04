import { useFormField } from '../useFormField'
import { useTextField } from './useTextField'

jest.mock('../useFormField')

let initialArgs
beforeEach(() => {
  initialArgs = {
    optional: false,
    value: 'the value',
    error: 'on',
    helperText: 'the help',
    label: 'the label',
  }

  useFormField.mockReturnValue({ prop1: 'prop1', prop2: 'prop2' })
})

test('sets initial values', () => {
  useTextField(initialArgs)
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('sets initialValue from form', () => {
  useTextField(initialArgs, 'i am initial')
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('defaults value to empty string', () => {
  useTextField()
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('returns all props needed', () => {
  const actual = useTextField(initialArgs)
  expect(actual).toMatchSnapshot()
})
