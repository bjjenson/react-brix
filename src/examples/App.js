import React from 'react'
import Name from './components/Name'
import Summary from './components/Summary'
import ExtraPanel from './components/ExtraPanel'
import { BrixProvider } from '../brix'
import { initialBrix } from './context'

const App = () => {
  return (
    <React.StrictMode>
      <BrixProvider value={initialBrix}>
        <div className='App'>
          <Name />
          <Summary />
          <ExtraPanel />
        </div>
      </BrixProvider>
    </React.StrictMode >
  )
}

export default App
