import React from 'react'
import { Map } from 'immutable'
import { useBrix } from '../../brix'
import { paths } from '../context'

export const useNotification = () => {
  const [value, set] = useBrix(paths.context.notification.get(), Map())

  return {
    value,
    set: message => set(Map([['message', message]])),
    setError: message => set(Map([['message', message], ['type', 'error']])),
    clear: () => set(Map()),
  }
}

const Notification = () => {
  const [message, setMessage] = React.useState('I am error')
  const { value, set, clear } = useNotification()
  const [buttonText] = React.useState('Start')

  const handleClick = () => {
    set(message)
  }

  return (
    <div>
      <h3>Notification</h3>
      <input type='text' onChange={e => setMessage(e.target.value)} value={message} />
      <button type='button' onClick={handleClick}>{buttonText}</button>
      <h4>{value.get('message')}</h4>
      {value.get('message') && <button type='button' onClick={clear}>Clear</button>}
    </div>
  )
}

export default Notification
