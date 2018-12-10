import * as React from 'react'
import { Map } from 'immutable'

export interface BrixProps extends React.HTMLAttributes<HTMLDivElement> {
  value: any,
}

export type BrixProvider = React.ComponentType<BrixProps>
export function getBrixContext(): React.Context<{ state: Map<string, any> }>
export function getBrixConsumer(): React.Consumer<BrixProps>
