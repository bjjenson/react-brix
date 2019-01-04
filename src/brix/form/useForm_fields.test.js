import { fromJS } from 'immutable'
import { useForm } from './useForm'
import {
  useBooleanField,
  useNumberField,
  useSelectField,
  useTextField,
} from './fields'

jest.mock('./fields')

let fieldProps, initialValues
beforeEach(() => {
  fieldProps = {
    props: {},
    validate: jest.fn(),
  }

  initialValues = fromJS({
    fieldName: 'i am initial',
  })

  useBooleanField.mockReturnValue(fieldProps)
  useNumberField.mockReturnValue(fieldProps)
  useSelectField.mockReturnValue(fieldProps)
  useTextField.mockReturnValue(fieldProps)
})

describe('text', () => {
  test('defaults to text', () => {
    useForm({
      fields: [
        { name: 'fieldName', label: 'the label' },
      ],
    })

    expect(useTextField.mock.calls[0]).toMatchSnapshot()
  })

  test('uses text', () => {
    useForm({
      fields: [
        { name: 'fieldName', type: 'text', label: 'the label' },
      ],
    })

    expect(useTextField.mock.calls[0]).toMatchSnapshot()
  })

  test('passes initialValue', () => {
    useForm({
      fields: [
        { name: 'fieldName', type: 'text', label: 'the label' },
      ],
      initialValues,
    })

    expect(useTextField.mock.calls[0]).toMatchSnapshot()
  })
})

describe('number', () => {
  test('uses text', () => {
    useForm({
      fields: [
        { name: 'fieldName', type: 'number', label: 'the label' },
      ],
    })

    expect(useNumberField.mock.calls[0]).toMatchSnapshot()
  })

  test('passes initialValue', () => {
    useForm({
      fields: [
        { name: 'fieldName', type: 'number', label: 'the label' },
      ],
      initialValues,
    })

    expect(useNumberField.mock.calls[0]).toMatchSnapshot()
  })
})

describe('select', () => {
  test('uses select', () => {
    useForm({
      fields: [
        { name: 'fieldName', type: 'select', label: 'the label' },
      ],
    })

    expect(useSelectField.mock.calls[0]).toMatchSnapshot()
  })

  test('passes initialValue', () => {
    useForm({
      fields: [
        { name: 'fieldName', type: 'select', label: 'the label' },
      ],
      initialValues,
    })

    expect(useSelectField.mock.calls[0]).toMatchSnapshot()
  })
})

describe('boolean', () => {
  test('uses boolean', () => {
    useForm({
      fields: [
        { name: 'fieldName', type: 'boolean', label: 'the label' },
      ],
    })

    expect(useBooleanField.mock.calls[0]).toMatchSnapshot()
  })

  test('passes initialValue', () => {
    useForm({
      fields: [
        { name: 'fieldName', type: 'boolean', label: 'the label' },
      ],
      initialValues,
    })

    expect(useBooleanField.mock.calls[0]).toMatchSnapshot()
  })
})