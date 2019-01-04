import React from 'react'
import { withStyles, TextField, Button, Switch, FormControlLabel } from '@material-ui/core' // eslint-disable-line import/no-extraneous-dependencies
import { useForm } from '../../../brix'
import { normalizePhone } from './normalizePhone'
import RadioField from './RadioField'
import { validateForm, validatePhone } from './validate'

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

const Address = ({ classes }) => {
  const form = useForm({
    fields: [
      { name: 'first', label: 'First' },
      { name: 'middle', label: 'Middle', optional: true },
      { name: 'last', label: 'Last' },
      { name: 'mobile', label: 'Mobile', normalize: normalizePhone, validate: validatePhone },
      { name: 'isAlive', label: 'IsAlive', type: 'boolean' },
      { name: 'gender', label: 'Gender', type: 'select', options: genderOptions },
    ],
    submit: values => console.log('submitting', values),
    validate: validateForm,
  })

  return (
    <div>
      Form test (material-ui)
      <form.Form className={classes.root}>
        <TextField {...form.first} />
        <TextField {...form.middle} />
        <TextField {...form.last} />
        <TextField {...form.mobile} />
        <RadioField {...form.gender} />
        <SwitchField {...form.isAlive} />
        <Button type='submit' onClick={form.submit}>Submit</Button>
      </form.Form>
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
    padding: 8,
  },
}

export default withStyles(styles)(Address)

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
]
