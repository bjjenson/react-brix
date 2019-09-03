import { useContext } from 'react'
import { fromJS, Map } from 'immutable'
import { useBrix } from '../brix/useBrix'
import { getBrixContext } from '../brix/BrixProvider'

jest.mock('react')
jest.mock('../brix/BrixProvider')

const setState = jest.fn()
let context, path
beforeEach(() => {
  path = ['user', 'name']
  context = {
    state: fromJS({
      user: {
        name: 'My Name',
      },
    }),
    setState,
  }

  useContext.mockReturnValue(context)
  getBrixContext.mockReturnValue('brix_context')

  setState.mockImplementation(getState => {
    return getState(context.state)
  })
})

test('returns state and setter from brixContext', () => {
  const actual = useBrix(path, Map())
  expect(actual).toMatchSnapshot()
  expect(useContext).toHaveBeenCalledWith('brix_context')
})

test('set updates brix state with value', () => {
  const [, set] = useBrix(path, Map())
  set('New Name')

  expect(setState.mock.calls[0]).toMatchSnapshot()
  expect(setState.mock.results[0]).toMatchSnapshot()
})

test('set updates brix state with function', () => {
  const [, set] = useBrix(path, Map())
  set(name => `updated-${name}`)

  expect(setState.mock.calls[0]).toMatchSnapshot()
  expect(setState.mock.results[0]).toMatchSnapshot()
})
