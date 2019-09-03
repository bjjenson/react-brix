import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { useToggleState } from '../state'
import { paths, getAddress } from '../context'
import { useBrixWorker, useBrix, withBoundary } from '../../brix'
import Address from './AddressWithProps'
// import Address from './Address'

const MyWorkingComponent = ({ context, street = '101 s main' }) => {

  const [, set] = useBrix(paths.address.street.get(), undefined, context)
  const address = useBrixWorker(paths.address.get(), getAddress, Map(), undefined, context)

  setTimeout(() => {
    set(street)
  }, 3000)

  return (
    <Address datum={address} />
  )
}

MyWorkingComponent.propTypes = {
  context: PropTypes.object,
  street: PropTypes.string,
}

MyWorkingComponent.defaultProps = {
  context: undefined,
  street: undefined,
}

const AsyncDataSample = (props) => {
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
        <MyWorkingComponent {...props} />
      )}
    </div>
  )
}

export default withBoundary(<div>working it...</div>)(AsyncDataSample)
