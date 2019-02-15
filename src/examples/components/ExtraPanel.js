import React from 'react'
import { Map } from 'immutable'
import { useToggleState } from '../state'
import { paths, getAddress } from '../context'
import { useBrixWorker, useBrix, withBoundary } from '../../brix'
import Address from './AddressWithProps'
// import Address from './Address'

const MyWorkingComponent = withBoundary(<div>working it...</div>)(() => {
  const address = useBrixWorker(paths.address.get(), getAddress, Map())
  const [, set] = useBrix(paths.address.street.get())
  setTimeout(() => {
    set('101 s main')
  }, 3000)

  return (
    <Address datum={address} />
  )
})

const ExtraPanel = () => {
  const { value, ...showAddressState } = useToggleState(true)

  return (
    <div>
      <button
        type='button'
        {...showAddressState}
      >
        {value ? 'Hide ' : 'Show '}
        Address
      </button>
      {value && (
        <MyWorkingComponent />
      )}
    </div>
  )
}

export default ExtraPanel
