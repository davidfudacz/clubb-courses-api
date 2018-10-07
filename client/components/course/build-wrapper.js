import React from 'react'
import Build from './build'

const TeeYardageWrapper = (props) => {
  const { builds } = props
  if (builds.length) {
    return (
      <div>
        {
          builds.map(build => <Build key={build.id} build={build} />)
        }
      </div>
    )
  }
  else {
    return (
      <h4>There is no architect information for this golf course</h4>
    )
  }
}

export default TeeYardageWrapper
