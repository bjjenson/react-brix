import React from 'react'
import TextField from './controls/TextField'
import { useBrix } from '../../brix'
import { paths } from '../context'

const Name = () => {
  const [firstName, setFirstName] = useBrix(paths.name.first.get())
  const [lastName, setLastName] = useBrix(paths.name.last.get())

  return (
    <>
      <TextField label='First' value={firstName} onChange={(({ target: { value } }) => setFirstName(value))} />
      <TextField label='Last' value={lastName} onChange={(({ target: { value } }) => setLastName(value))} />
    </>
  )
}

export default Name
