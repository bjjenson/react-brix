import { useState } from 'react'

export const useToggleState = (value = false) => {
  const [isSet, set] = useState(false)
  const toggle = () => {
    set(!isSet)
  }

  return {
    value: isSet,
    onClick: toggle,
  }

}