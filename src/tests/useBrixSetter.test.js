import { fromJS } from 'immutable'
import { useContext } from 'react'
import { getBrixContext } from '../brix/BrixProvider'
import { useBrixSetter } from '../brix/useBrixSetter'

jest.mock('../brix/BrixProvider')
jest.mock('react')

const setState = jest.fn()
let context, state
beforeEach(() => {
  state = fromJS({
    user: {
      name: 'old name',
    },
  })

  context = {
    setState,
  }
  useContext.mockReturnValue(context)
  getBrixContext.mockReturnValue('brix_context')

  setState.mockImplementation(getState => {
    return getState(state)
  })
})

test('returns set', () => {
  expect(useBrixSetter()).toMatchSnapshot()
})

test('set updates state at path', () => {
  const set = useBrixSetter()

  set(['user', 'name'], 'new name')
  expect(setState.mock.results[0]).toMatchSnapshot()
})
