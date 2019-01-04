import { useFormField } from '../useFormField'
import { useNumberField } from './useNumberField'

jest.mock('../useFormField')

let initialArgs
beforeEach(() => {
  initialArgs = {
    value: 23,
  }

  useFormField.mockReturnValue({ prop1: 'prop1', prop2: 'prop2' })
})


test('sets initial values', () => {
  useNumberField(initialArgs)
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('sets initialValue from args', () => {
  useNumberField(initialArgs, false)
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('defaults value to 0', () => {
  useNumberField()
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('returns all props needed', () => {
  const actual = useNumberField(initialArgs)
  expect(actual).toMatchSnapshot()
})
