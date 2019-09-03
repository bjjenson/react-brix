import React from 'react'
import { Map } from 'immutable'
import { CustomProvider, CustomContext } from '../context/customContext'
import Name from './Name'
import AsyncDataSample from './AsyncDataSample'

const ContextWrapper = () => {
  return (
    <CustomProvider value={Map().set('custom', true)}>
      <Name context={CustomContext} />
      <AsyncDataSample context={CustomContext} street='600 Custom dr.' />
      {/* <Notification /> */}
    </CustomProvider>
  )
}

export default ContextWrapper
