import { Map } from 'immutable'
import { paths } from './paths'

export const initialBrix = Map()
  .setIn(paths.name.first.get(), 'Bryan')
  .setIn(paths.name.last.get(), 'Jenson')
