import React from 'react'
import { Header } from '../ui-elements'

const ClubNameHeader = (props) => {
  if (!props.club) throw new Error('ClubNameHeader component requires a club object prop')
  const { isInformal, name, informal } = props.club
  const displayName = isInformal && !!informal ? informal : name
  return (
    <Header>{displayName}</Header>
  )
}

export default ClubNameHeader
