import React from 'react'
import BoundedSuspense from './BoundedSuspense'

export const withBoundary = (fallback) => (Component) => (props) => (<BoundedSuspense fallback={fallback}><Component {...props} /></BoundedSuspense>) // eslint-disable-line react/display-name
