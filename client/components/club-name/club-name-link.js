import React from 'react'
import { Link } from '../ui-elements'
import { _parseClubUrl, _parseClubNameForDisplay } from '../../utilities'

const ClubNameHeader = (props) => {
  if (!props.club) throw new Error('ClubNameHeader component requires a club object prop')
  const { isInformal, club } = props
  return (
    <Link to={_parseClubUrl(props.club)}>{_parseClubNameForDisplay(club, isInformal)}</Link>
  )
}

export default ClubNameHeader
