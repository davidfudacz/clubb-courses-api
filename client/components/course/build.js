import React from 'react'
import { _parseBuildWordingForDisplay } from '../../utilities'

const Build = (props) => {
  return (
    <h5>{_parseBuildWordingForDisplay(props.build)}</h5>
  )
}

export default Build
