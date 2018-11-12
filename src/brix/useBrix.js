import { fromJS } from 'immutable'
import { useContext } from 'react'
import { BrixContext } from './BrixProvider'

export const useBrix = (path, notSetValue) => {
  const { state, setState } = useContext(BrixContext)
  const value = state.getIn(path, notSetValue)

  const update = updatedValue =>
    setState(state.setIn(path, coerceDataToImmutable(updatedValue)))

  return {
    value,
    set: update,
    cnx: {
      value,
      onChange: e => update(e.target.value),
    },
  }
}

const coerceDataToImmutable = data =>
  isPlainObject(data) || Array.isArray(data) ? fromJS(data) : data

const isPlainObject = data =>
  data &&
  ((data.constructor && data.constructor.name === 'Object') ||
    data.constructor === undefined)
