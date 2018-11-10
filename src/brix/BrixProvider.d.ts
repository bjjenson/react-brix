import * as React from 'react'
import { Map } from 'immutable'

export interface BrixProps extends React.HTMLAttributes<HTMLDivElement> {
  value: any,
}

export type BrixContext = React.Context<{ state: Map }>
export type BrixProvider = React.ComponentType<BrixProps>
export type BrixConsumer = React.Consumer
