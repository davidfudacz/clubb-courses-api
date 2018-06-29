import React from 'react'
import { headerStyle } from '../../../styles'

const Header = (props) => {
  const { type } = props
  return (
    <h1 style={headerStyle[type]}>
    {
      props.children
    }
    </h1>
  )
}

export default Header
