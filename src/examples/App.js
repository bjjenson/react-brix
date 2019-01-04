import React from 'react'
import Name from './components/Name'
import Summary from './components/Summary'
import ExtraPanel from './components/ExtraPanel'
import Notification from './components/Notification'
import Form from './components/form/Form'
import { BrixProvider } from '../brix'
import { initialBrix } from './context'

const App = () => {
  return (
    <BrixProvider value={initialBrix}>
      <div className='App'>
        <Name />
        <Summary />
        <ExtraPanel />
        <Notification />
        <Form />
      </div>
    </BrixProvider>
  )
}

export default App
