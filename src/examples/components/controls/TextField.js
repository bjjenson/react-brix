import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, ...rest }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...rest}
      />
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

TextField.defaultProps = {
  value: undefined,
  onChange: () => undefined
}

export default TextField