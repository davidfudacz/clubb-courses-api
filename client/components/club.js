/* eslint react/prefer-stateless-function: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getClubFromServerThunkerator } from '../store'
import {
  ClubNameHeader,
} from '../components'

class Club extends React.Component {

  componentDidMount () {
    console.log(this.props)
    const clubId = this.props.match.params.clubId
    this.props.fetchClub(clubId)
  }

  render () {
    return (
      <div>
        <ClubNameHeader
          club={this.props.activeClub}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ activeClub }) => ({ activeClub })

const mapDispatchToProps = (dispatch) => ({
  fetchClub: (id) => dispatch(getClubFromServerThunkerator(id)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Club))
