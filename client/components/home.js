/* eslint react/prefer-stateless-function: 0 */
import React from 'react'
import { connect } from 'react-redux'
import {
  getAllClubsFromServerThunkerator,
  getAllCoursesFromServerThunkerator,
  getAllRankingListsFromServerThunkerator,
  clearClubs,
  clearCourses,
  clearRankingLists,
} from '../store'
import {
  Header,
  Link,
} from '../components'
import {
  _sortClubsAlphabetically,
  _sortCoursesAlphabetically,
  _parseClubNameForDisplay,
  _parseClubUrl,
  _parseCourseNameForDisplay,
  _parseCourseUrl,
  _parseRankingListUrl,
  _parseRankingListNameForDisplay,
} from '../utilities'

class Home extends React.Component {

  componentDidMount () {
    this.props.initialize()
  }

  componentWillUnmount () {
    this.props.clear()
  }
  render () {
    return (
      <div>
        {
          _sortClubsAlphabetically(this.props.clubs).map(club => {
            return (
              <div key={club.id}>
                <Header>{_parseClubNameForDisplay(club)}</Header>
                <Link to={_parseClubUrl(club)}>{_parseClubNameForDisplay(club)}</Link>
              </div>
            )
          })
        }
        <h1 style={{color: 'red'}}>Courses</h1>
        {
          _sortCoursesAlphabetically(this.props.courses).map(course => {
            return (
              <div key={course.id}>
                <Header>{_parseCourseNameForDisplay(course, true)}</Header>
                <Link to={_parseCourseUrl(course)}>{_parseCourseNameForDisplay(course, true)}</Link>
              </div>
            )
          })
        }
        <h1 style={{color: 'red'}}>Lists</h1>
        {
          this.props.rankingLists.map(rankingList => {
            return (
              <div key={rankingList.id}>
                <Link to={_parseRankingListUrl(rankingList)}>{_parseRankingListNameForDisplay(rankingList, true)}</Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = ({ clubs, courses, rankingLists }) => ({ clubs, courses, rankingLists })

const mapDispatchToProps = (dispatch) => ({
  initialize: () => {
    dispatch(getAllClubsFromServerThunkerator())
    dispatch(getAllCoursesFromServerThunkerator())
    dispatch(getAllRankingListsFromServerThunkerator())
  },
  clear: () => {
    dispatch(clearClubs())
    dispatch(clearCourses())
    dispatch(clearRankingLists())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
