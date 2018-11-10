import { useState } from 'react'

export const useInputState = (value = '') => {
  const [_value, setValue] = useState(value)

  return {
    value: _value,
    onChange: setValue,
  }
}