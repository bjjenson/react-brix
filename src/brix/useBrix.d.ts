export function useBrix(path: Array<string>, notSetValue: any): {
  value: any,
  set: (value: any) => void,
  cnx: {
    value: any,
    onChange: (event: any) => void,
  }
}
