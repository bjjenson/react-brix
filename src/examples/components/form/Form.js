import React, { useState } from 'react'
import { fromJS, Map } from 'immutable'
import { withStyles, TextField, Button, Switch, FormControlLabel } from '@material-ui/core' // eslint-disable-line import/no-extraneous-dependencies
import { useForm, useBrixWorker, withBoundary } from '../../../brix'
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

const useInitialValues = () => {
  const getInitialValues = async () => {
    const values = {
      isAlive: true,
      first: 'Paul',
    }
    // return values
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fromJS(values))
      }, 1000)
    })

  }
  return useBrixWorker(['form', 'values'], getInitialValues, Map())
}

const getColorField = i => ({ name: `color${i}`, label: `Color ${i + 1}` })

const Address = withBoundary(<div>loading it</div>)(({ classes }) => {
  const [colorCount, setColorCount] = useState(0)
  const initialValues = useInitialValues()

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
    initialValues,
  })

  const colorFields = () => {
    const fields = []
    for (let i = 0; i < colorCount; i++) {
      const key = `color${i}`
      if (form[key]) {
        fields.push(
          <div key={key}>
            <TextField {...form[key]} />
            <Button onClick={() => form.removeField(key)}>X</Button>
          </div>
        )
      }
    }
    return fields
  }

  const addColor = () => {
    form.addField(getColorField(colorCount))
    setColorCount(colorCount + 1)
  }

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
        {colorFields()}
        <Button onClick={addColor}>more</Button>
        <Button type='submit' onClick={form.submit}>Submit</Button>
      </form.Form>
    </div>
  )
})


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
