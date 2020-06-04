export interface ISuspense {
  fallback: React.ReactType<React.ReactPropTypes>
  boundary: React.ReactType<React.ReactPropTypes>
}

declare const BoundedSuspense: React.ComponentType<ISuspense>
export default BoundedSuspense
