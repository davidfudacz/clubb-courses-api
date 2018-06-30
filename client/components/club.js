/* eslint react/prefer-stateless-function: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getClubFromServerThunkerator, clearClub } from '../store'
import {
  ClubNameHeader,
  Course,
} from '../components'

class Club extends React.Component {

  componentDidMount () {
    const clubId = this.props.match.params.clubIdgit
    this.props.fetchClub(clubId)
  }

  componentWillUnmount () {
    this.props.clearClub()
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
  clearClub: () => dispatch(clearClub())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Club))
