/* eslint react/prefer-stateless-function: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getClubFromServerThunkerator, clearClub } from '../store'
import {
  Header,
  CourseList,
} from '../components'
import {
  _parseClubNameForDisplay,
} from '../utilities'

class Club extends React.Component {

  componentDidMount () {
    const clubId = this.props.match.params.clubId
    this.props.fetchClub(clubId)
  }

  componentWillUnmount () {
    this.props.clearClub()
  }

  render () {
    const { activeClub } = this.props
    const courseToHighlight = this.props.match.params.courseId
    return (
      <div>
        <Header>{_parseClubNameForDisplay(activeClub, false)}</Header>
        <CourseList
          courseToHighlight={courseToHighlight}
          club={activeClub}
        />
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
