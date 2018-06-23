/* eslint react/prefer-stateless-function: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getClubFromServerThunkerator } from '../store'
import {
  ClubNameHeader,
  Course,
} from '../components'

class Club extends React.Component {

  componentDidMount () {
    const clubId = this.props.match.params.clubId
    this.props.fetchClub(clubId)
  }

  render () {
    const { activeClub } = this.props
    const courses = activeClub.courses ? activeClub.courses : []
    return (
      <div>
        <ClubNameHeader
          club={activeClub}
        />
        {
          courses.map(course => <Course key={course.id} course={course} />)
        }
      </div>
    )
  }
}

const mapStateToProps = ({ activeClub }) => ({ activeClub })

const mapDispatchToProps = (dispatch) => ({
  fetchClub: (id) => dispatch(getClubFromServerThunkerator(id)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Club))
