import React from 'react'
import { Link } from 'react-router-dom'

const CustomLink = (props) => {
  const { to } = props
  return (
    <Link to={to}>
    {
      props.children
    }
    </Link>
  )
}

export default CustomLink
