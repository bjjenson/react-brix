# react-brix

React-Brix
============

React-Brix is inspired by react hooks and Redux.  I have enjoyed using Redux in my React apps for a long time.  Now with hooks this has become much easier.

Requirements
----
React ^16.7.0-alpha.0
Immutable

Intallation
----

To install this :

```
npm install react-brix --save

```
or
```
yarn add react-brix

```

Benefits
----
React-brix allows you to implement an immutable app-wide state machine in React without having to write reducers or selectors.  Just use a hook to get the data from your state using a path.  If the data is not assigned yet, provide an action to retrieve the data. The data will be stored in state for next time.

Setup
----
```
import { BrixProvider } from 'react-brix'
...
const App = () => {
  return (
    <React>
      <BrixProvider value={initialBrix}>
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

useBrix
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

useBrixWorker
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

ToDo
----
- Configure the data store so that something other than immutable can be used such as perpetual-js or plain JS
- Enhance it!
