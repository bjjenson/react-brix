import * as React from 'react'
import { Map } from 'immutable'

export interface BrixProps {
  value: any,
}


export const BrixProvider: React.ComponentType<BrixProps>
export function getBrixContext(): React.Context<{ state: Map<string, any> }>
export function getBrixConsumer(): React.Consumer<BrixProps>
