import { useFormField } from '../useFormField'
import { useSelectField } from './useSelectField'

jest.mock('../useFormField')

let initialArgs
beforeEach(() => {
  initialArgs = {
    optional: false,
    value: 'selected',
    error: 'on',
    helperText: 'the help',
    label: 'the label',
    options: [{ value: 'value1', label: 'label1' }],
  }

  useFormField.mockReturnValue({
    props: {
      prop1: 'prop1',
      prop2: 'prop2',
    },
    validate: 'validateFunction',
  })
})

test('sets initial values', () => {
  useSelectField(initialArgs)
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('sets initialValue from form', () => {
  useSelectField(initialArgs, 'i am initial')
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('defaults value to empty string', () => {
  useSelectField()
  expect(useFormField.mock.calls[0]).toMatchSnapshot()
})

test('returns all props needed', () => {
  const actual = useSelectField(initialArgs)
  expect(actual).toMatchSnapshot()
})
