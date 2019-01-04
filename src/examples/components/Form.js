import React from 'react'
import { TextField, Button, Switch, FormControlLabel } from '@material-ui/core'
import { useForm } from '../../brix'

const SwitchField = ({ label, error, helperText, ...rest }) => {
  return (
    <FormControlLabel
      control={(
        <Switch
          {...rest}
        />
      )}
      label={label}
    />
  )
}

const Address = () => {
  const form = useForm({
    fields: [
      { name: 'first', label: 'First' },
      { name: 'middle', label: 'Middle', optional: true },
      { name: 'last', label: 'Last' },
      { name: 'isAlive', label: 'IsAlive', type: 'boolean' },
    ],
    submit: values => console.log('submitting', values),
  })

  return (
    <div>
      Form test (material-ui)
      <form.Form>
        <TextField {...form.first} />
        <TextField {...form.middle} />
        <TextField {...form.last} />
        <SwitchField {...form.isAlive} />
        <Button type='submit' onClick={form.submit}>Submit</Button>
      </form.Form>
    </div>
  )
}

export default Address
