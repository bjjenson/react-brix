import React from 'react'
import PropTypes from 'prop-types'

class BoundedSuspense extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    const { fallback, boundary, children } = this.props
    const { hasError } = this.state
    if (hasError) {
      return boundary
    }

    return (
      <React.Suspense fallback={fallback}>
        {children}
      </React.Suspense>
    )
  }
}

BoundedSuspense.propTypes = {
  fallback: PropTypes.node.isRequired,
  boundary: PropTypes.node,
}

BoundedSuspense.defaultProps = {
  boundary: <h3 style={{ color: 'red' }}>Something is bad</h3>,
}

export default BoundedSuspense