import React from 'react'

const ClubNameHeader = (props) => {
  if (!props.club) throw new Error('ClubNameHeader component requires a club object prop')
  const { isInformal, name, informal } = props.club
  const displayName = isInformal && !!informal ? informal : name
  return (
    <h1>{displayName}</h1>
  )
}

export default ClubNameHeader
