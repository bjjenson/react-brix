import { fromJS } from 'immutable'
import { useContext } from 'react'
import { getBrixContext } from '../brix/BrixProvider'
import { useBrixSetter } from '../brix/useBrixSetter'

jest.mock('../brix/BrixProvider')
jest.mock('react')

const setBrixState = jest.fn()
let context, state
beforeEach(() => {
  state = fromJS({
    user: {
      name: 'old name',
    },
  })

  context = {
    setBrixState,
  }
  useContext.mockReturnValue(context)
  getBrixContext.mockReturnValue('brix_context')

  setBrixState.mockImplementation(getState => {
    return getState(state)
  })
})

test('returns set', () => {
  expect(useBrixSetter()).toMatchSnapshot()
})

test('set updates state at path', () => {
  const set = useBrixSetter()

  set(['user', 'name'], 'new name')
  expect(setBrixState.mock.results[0]).toMatchSnapshot()
})
