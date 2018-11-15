import { Worker } from './worker'

export function useBrixWorker(path: Array<String>, worker: Worker, notSetValue: any, transformer?: (data: any) => any): { value: any }
