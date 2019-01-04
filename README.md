## react-brix

React-Brix
============

React-Brix is inspired by react hooks and Redux.
React-brix allows you to implement an immutable app-wide state machine in React without having to write reducers or selectors.  Just use a hook to get the data from your state using a path.  If the data is not assigned yet, provide a connector to retrieve the data. The data will be stored in state automatically for you.

* [useBrix] - set/retrieve data from the app context
* useBrixWorker - (same as useBrix), If data does not exist, asynchronously gets data with a worker and stores in state
* useForm - complete forms hook.  Easily configure form fields, validation and options.  useForm takes care of the rest.

Requirements
----
React ^16.7.0-alpha.2
[Immutable.js](https://github.com/facebook/immutable-js/)

Installation
----

To install this :

```
npm install react-brix --save

```
or
```
yarn add react-brix

```

### Setup
----
```
import { BrixProvider } from 'react-brix'
...
const App = () => {
  return (
    <React>
      <BrixProvider value={initialState}>
        <div className='App'>
          ...
        </div>
      </BrixProvider>
    </React.StrictMode >
  )
}
```
Where the initialBrix value is an immutable Map with any initial data your want for your app.

Usage
----

### useBrix
```
import { useBrix } from 'react-brix'
import { paths } from '../context'
...
const Name = () => {
  const [value, set] = useBrix(paths.name.first.get())

  return (
    <>
      <TextField label='First' value={value} />
      ...
    </>
  )
}

export default Name

```

### useBrixWorker
```
import { useBrixWorker, BoundedSuspense } from 'react-brix'
import { paths, getAddress } from '../context'
...
const MyWorkingComponent = () => {
  const address = useBrixWorker(paths.address.get(), getAddress, Map())
  return (
    <Address datum={address} />
  )
}
...
const AddressWrapper = () => {

  return (
    <BoundedSuspense
      fallback={<div>fetching address...</div>}
      boundary={<div>An error ocurred getting the address</div>}
    >
      <MyWorkingComponent />
    </BoundedSuspense>
  )
}

export default AddressWrapper
```
- getAddress is an async function that will return the address when completed.
- Map() can be substituted for whatever default value you expect.
- BoundedSuspense uses React.Suspense but also adds an error boundary for catching async errors that my happen.

### useForm
useForm is inspired by [Redux-Form](https://github.com/erikras/redux-form) but with a simple hook
It works best with [Material-ui](https://material-ui.com/) but can be uses natively as well.

#### Simple Form
```
import { useForm } from 'react-brix'

const MyForm = ()=> {
  const form = useForm({
    fields: [
      { name: 'first', label: 'First' },
      { name: 'last', label: 'Last' },
    ],
    submit: values => console.log('submitting', values),
  })

  return (
    <form.Form>
      <TextField {...form.first} />
      <TextField {...form.last} />
      <Button type='submit' onClick={form.submit}>Submit</Button>
    </form.Form>
  )
}
```
#### Complex Form
* Each field can be validated individually and/or a general validate function can be supplied to useForm
* `submit` is not called unless the form validates
* fields are required by default
```
import { useForm } from 'react-brix'
...
const MyForm = ()=> {
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

    return (
    <form.Form className={classes.root}>
      <TextField {...form.first} />
      <TextField {...form.middle} />
      <TextField {...form.last} />
      <TextField {...form.mobile} />
      <RadioField {...form.gender} />
      <SwitchField {...form.isAlive} />
      <Button type='submit' onClick={form.submit}>Submit</Button>
    </form.Form>
  )
}
```

ToDo
----
- Configure the data store so that something other than immutable can be used such as perpetual-js or plain JS
- Enhance it!
