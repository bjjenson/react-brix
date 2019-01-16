import { useFormField } from '../useFormField'
import { useBooleanField } from './useBooleanField'

jest.mock('../useFormField')

let initialArgs
beforeEach(() => {
  initialArgs = {
    value: true,
  }

  useFormField.mockReturnValue({ prop1: 'prop1', prop2: 'prop2', props: { value: true } })
})


test('sets initial values', () => {
  useBooleanField(initialArgs)
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('sets initialValue from args', () => {
  useBooleanField(initialArgs, false)
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('defaults value to false', () => {
  useBooleanField()
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('returns all props needed', () => {
  const actual = useBooleanField(initialArgs)
  expect(actual).toMatchSnapshot()
})

test('valueFromTarget returns checked', () => {
  useBooleanField()
  expect(useFormField.mock.calls[0][1].valueFromTarget({ checked: 'i am value' })).toEqual('i am value')
})
