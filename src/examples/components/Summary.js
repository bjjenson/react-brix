import React from 'react'
import { getBrixContext } from '../../brix'
import { paths } from '../context'

class Summary extends React.PureComponent {
  render() {
    const { state } = this.context

    return (
      <div>
        <h5>
          Summary for
          <span>
            &nbsp;
            {state.getIn(paths.name.first.get())}
          </span>
          <span>
            &nbsp;
            {state.getIn(paths.name.last.get())}
          </span>
        </h5>
      </div>
    )
  }
}

Summary.contextType = getBrixContext()

export default Summary
