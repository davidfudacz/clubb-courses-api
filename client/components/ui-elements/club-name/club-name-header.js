import React from 'react'
import { Header } from '../../ui-elements'
import { _parseClubNameForDisplay } from '../../../utilities'

const ClubNameHeader = (props) => {
  if (!props.club) throw new Error('ClubNameHeader component requires a club object prop')
  const { isInformal, club, type } = props
  return (
    <Header type={type}>{_parseClubNameForDisplay(club, isInformal)}</Header>
  )
}

export default ClubNameHeader
