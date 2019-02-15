export { BrixProps, BrixProvider, getBrixConsumer, getBrixContext } from './BrixProvider'
export { useBrix } from './useBrix'
export { useBrixSetter } from './useBrixSetter'
export { useBrixWorker } from './useBrixWorker'
export { useForm } from './form'
export { withBoundry } from './withBoundry'
export interface ISuspense {
  fallback: React.ReactNode
}

export function BoundedSuspense(): React.Component<ISuspense>
