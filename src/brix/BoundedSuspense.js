import React from 'react'
import PropTypes from 'prop-types'

class BoundedSuspense extends React.Component {
  static getDerivedStateFromError() {
    return { hasError: true }
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

  state = { hasError: false }

  componentDidCatch(error, info) {
    console.log(error, info)
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
