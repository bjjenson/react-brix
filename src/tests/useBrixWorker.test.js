import { Map } from 'immutable'
import { useContext } from 'react'
import { useBrix } from '../brix/useBrix'
import { getBrixContext } from '../brix/BrixProvider'
import { useWorker } from '../brix/useWorker'
import { useBrixWorker } from '../brix/useBrixWorker'

jest.mock('react')
jest.mock('../brix/useBrix')
jest.mock('../brix/useWorker')
jest.mock('../brix/BrixProvider')

const set = jest.fn()
const worker = jest.fn()

let path
beforeEach(() => {
  path = ['path', 'to', 'value']
  useBrix.mockReturnValue(['something set', set])
  useContext.mockReturnValue({ state: 'context-state' })
  getBrixContext.mockReturnValue('brix-context')
})

test('returns value from brix', () => {
  const actual = useBrixWorker(path, worker, Map())

  expect(actual).toMatchSnapshot()
  expect(useBrix).toHaveBeenCalledWith(path)
  expect(useContext).toHaveBeenCalledWith('brix-context')
})

test('brix value is undefined return notSetValue', () => {
  useBrix.mockReturnValue([undefined, set])

  const actual = useBrixWorker(path, worker, Map())
  expect(actual).toMatchSnapshot()
  expect(useWorker.mock.calls[0]).toMatchSnapshot()
})

describe('worker', () => {
  beforeEach(() => {
    useBrix.mockReturnValue([undefined, set])
    useWorker.mockImplementation((path, todo) => {
      todo()
      return 'workerResult'
    })
  })

  test('useWorker calls worker', () => {
    useBrixWorker(path, worker, Map())

    expect(worker.mock.calls[0]).toMatchSnapshot()
    expect(set).toHaveBeenCalledWith('workerResult')
  })

  test('worker result is undefined, set notSetValue', () => {
    useWorker.mockImplementation((path, todo) => {
      todo()
      return undefined
    })

    useBrixWorker(path, worker, Map())

    expect(set).toHaveBeenCalledWith(Map())
  })

  test('set uses transformer', () => {
    useBrixWorker(path, worker, Map(), result => `${result} transformed`)

    expect(set).toHaveBeenCalledWith('workerResult transformed')
  })
})
