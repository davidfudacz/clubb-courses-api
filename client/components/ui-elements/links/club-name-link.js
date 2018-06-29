import React from 'react'
import Link from './link'
import { _parseClubUrl, _parseClubNameForDisplay } from '../../../utilities'

const ClubNameHeader = (props) => {
  if (!props.club) throw new Error('ClubNameHeader component requires a club object prop')
  const { isInformal, club, type } = props
  return (
    <Link type={type} to={_parseClubUrl(props.club)}>{_parseClubNameForDisplay(club, isInformal)}</Link>
  )
}

export default ClubNameHeader
