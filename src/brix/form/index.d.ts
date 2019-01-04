import { StepInstance } from 'twilio/lib/rest/studio/v1/flow/engagement/step';
import { Map } from 'immutable'

export type FieldTypes =
  'text' |
  'boolean' |
  'select' |
  'number'

export interface IFormFieldArgs<T = String> {
  name: String
  type: FieldTypes
  helperText: String
  optional: Boolean
  requiredMessage?: String
  label: String
  normalize?: Function
  value: T
  validate?: Function
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
  onFocus: Function
}

export interface IFormFieldReturn {
  props: IFormTextFieldProps
  validate: () => bool
}

export interface IForm {
  [key: String]: IFormTextFieldProps
  Form: React.Component
  submit: Function
}

export interface IFormProps {
  fields: Array<IFormFieldArgs>
  submit: (values: Object) => Promise
  validate?: (values: Object) => Object
  initialValues?: Map<String, any>
}

export function useForm(props: IFormProps): IForm
