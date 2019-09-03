import React from 'react'
import Name from './components/Name'
import Summary from './components/Summary'
import AsyncDataSample from './components/AsyncDataSample'
import Notification from './components/Notification'
import ContextWrapper from './components/NewContextWrapper'
import { BrixProvider } from '../brix'
import { initialBrix } from './context'


const App = () => {
  return (
    <BrixProvider value={initialBrix}>
      <div className='App'>
        <Name />
        <Summary />
        <AsyncDataSample />
        <Notification />
        <ContextWrapper />
      </div>
    </BrixProvider>
  )
}

export default App
