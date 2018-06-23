import React from 'react'
import { buttonStyle } from '../../styles'

const SubHeader = (props) => {
  const { type, onClick } = props
  return (
    <div
      style={buttonStyle[type]}
      onClick={onClick}
    >
    {
      props.children
    }
    </div>
  )
}

export default SubHeader
