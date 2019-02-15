import BoundedSuspense from './BoundedSuspense'

export const withBoundry = (fallBack) => (Component) => (props) => (<BoundedSuspense fallBack={fallBack}><Component {...props} /></BoundedSuspense>)
