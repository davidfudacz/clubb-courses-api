/* eslint react/prefer-stateless-function: 0 */
import React from 'react'
import { connect } from 'react-redux'
import {
  getAllClubsFromServerThunkerator,
  getAllCoursesFromServerThunkerator,
  getAllRankingListsFromServerThunkerator,
} from '../store'
import {
  ClubNameHeader,
  ClubNameLink,
  CourseNameHeader,
  CourseNameLink,
  RankingListLink,
} from '../components'
import {
  _sortClubsAlphabetically,
  _sortCoursesAlphabetically,
} from '../utilities'

class Home extends React.Component {

  componentDidMount () {
    this.props.initialize()
  }
  render () {
    return (
      <div>
        {
          _sortClubsAlphabetically(this.props.clubs).map(club => {
            return (
              <div key={club.id}>
              <ClubNameHeader
                club={club}
              />
              <ClubNameLink
                club={club}
              />
              </div>
            )
          })
        }
        <h1 style={{color: 'red'}}>Courses</h1>
        {
          _sortCoursesAlphabetically(this.props.courses).map(course => {
            return (
              <div key={course.id}>
              <CourseNameHeader
                course={course}
                isInformal={true}
              />
              <CourseNameLink
                course={course}
                isInformal={true}
              />
              </div>
            )
          })
        }
        <h1 style={{color: 'red'}}>Lists</h1>
        {
          this.props.rankingLists.map(rankingList => {
            return (
              <div key={rankingList.id}>
              <RankingListLink rankingList={rankingList} />
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
