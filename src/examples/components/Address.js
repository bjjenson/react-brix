import React from 'react'
import TextField from './controls/TextField'
import { useBrix } from '../../brix'
import { paths } from '../context'

const Address = () => {
  const [street, setStreet] = useBrix(paths.address.street.get(), '')
  return (
    <div>
      <h5>Address</h5>
      <TextField
        label='Street'
        value={street}
        onChange={({ target: { value } }) => setStreet(value)}
      />
    </div>
  )
}

export default Address
