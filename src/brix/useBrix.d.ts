import React from 'react'

export function useBrix<V>(path: string[], notSetValue: any, customContext?: React.Context): [V | any, (value: any) => void]
