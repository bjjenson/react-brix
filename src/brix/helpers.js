import { fromJS } from 'immutable'

export const coerceDataToImmutable = data =>
  isPlainObject(data) || Array.isArray(data) ? fromJS(data) : data

const isPlainObject = data =>
  data &&
  ((data.constructor && data.constructor.name === 'Object') ||
    data.constructor === undefined)
