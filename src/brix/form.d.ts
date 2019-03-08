import { Map } from 'immutable'

export type FieldTypes =
  'text' |
  'boolean' |
  'select' |
  'number'

export interface IFieldValues {
  [key: String]: any
}

export interface IFormFieldArgs<T = String> {
  name: String
  type: FieldTypes
  helperText: String
  optional: Boolean
  requiredMessage?: String
  label: String
  normalize?: Function
  value: T
  validate?: (value: T, fieldName: String, getValues: () => IFieldValues) => String
  options?: Array<ISelectOptions>
  valueFromTarget?: (target: Object) => T
}

export interface ISelectOptions {
  value: String
  label: String
}

export interface IFormTextFieldProps {
  error: Boolean
  helperText: String
  label: String
  value: String
  // Handlers
  onBlur: Function
  onChange: Function
}

export interface IFormField {
  props: IFormTextFieldProps
  setValidationResult: (result: String) => void
  setValue: (value: String) => void
  validate: () => void
}

export interface IForm {
  [key: String]: IFormTextFieldProps
  Form: React.Component
  submit: Function
  addField: (field: IFormFieldArgs) => void
  removeField: (fieldName: String) => void
}

export interface IFormErrors {
  [key: String]: String
}

export interface IFormValues {
  [key: String]: any
}

export interface IFormProps {
  fields: Array<IFormFieldArgs>
  setValue: (fieldName: String, value: any) => void
  submit: (values: IFormValues) => Promise
  validate?: (values: IFormValues) => IFormErrors
  initialValues?: Map<String, any>
}

export function useForm(props: IFormProps): IForm
