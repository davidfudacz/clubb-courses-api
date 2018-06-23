import React from 'react'
import { subHeaderStyle } from '../../styles'

const SubHeader = (props) => {
  const { type } = props
  return (
    <h3 style={subHeaderStyle[type]}>
    {
      props.children
    }
    </h3>
  )
}

export default SubHeader
