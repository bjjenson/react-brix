import React from 'react'
import TextField from './controls/TextField'

const Address = ({ datum }) => {
  return (
    <div>
      <h5>Address</h5>
      <TextField label='Streetum' value={datum.get('street', '')} />
    </div>
  )
}

export default Address
