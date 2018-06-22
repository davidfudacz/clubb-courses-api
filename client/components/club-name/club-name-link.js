import React from 'react'
import { Link } from '../ui-elements'
import { _parseClubUrl } from '../../utilities'

const ClubNameHeader = (props) => {
  if (!props.club) throw new Error('ClubNameHeader component requires a club object prop')
  const { isInformal, name, informal } = props.club
  const displayName = isInformal && !!informal ? informal : name
  return (
    <Link to={_parseClubUrl(props.club)}>{displayName}</Link>
  )
}

export default ClubNameHeader
