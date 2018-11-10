import React from 'react'
import TextField from './controls/TextField'
import { useBrix } from '../../brix'
import { paths } from '../context'

const Name = () => {
  const firstNameState = useBrix(paths.name.first.get())
  const lastNameState = useBrix(paths.name.last.get())

  return (
    <>
      <TextField label='First' {...firstNameState.cnx} />
      <TextField label='Last' {...lastNameState.cnx} />
    </>
  )
}

export default Name
