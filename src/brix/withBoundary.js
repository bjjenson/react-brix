import React from 'react'
import BoundedSuspense from './BoundedSuspense'

export const withBoundary = (fallback, boundary) => (Component) => (props) => (<BoundedSuspense fallback={fallback} boundary={boundary}><Component {...props} /></BoundedSuspense>) // eslint-disable-line react/display-name
