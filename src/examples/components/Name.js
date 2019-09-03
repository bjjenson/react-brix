import React from 'react'
import PropTypes from 'prop-types'
import TextField from './controls/TextField'
import { useBrix } from '../../brix'
import { paths } from '../context'

const Name = ({ context }) => {
  const [firstName, setFirstName] = useBrix(paths.name.first.get(), '', context)
  const [lastName, setLastName] = useBrix(paths.name.last.get(), '', context)

  return (
    <>
      <TextField label='First' value={firstName} onChange={(({ target: { value } }) => setFirstName(value))} />
      <TextField label='Last' value={lastName} onChange={(({ target: { value } }) => setLastName(value))} />
    </>
  )
}

Name.propTypes = {
  context: PropTypes.object,
}

export default Name
