import { Worker } from './worker'

export function useBrixWorker<V, NSV>(path: Array<String>, worker: Worker, notSetValue: NSV | any, transformer?: (data: any) => any): V | any
