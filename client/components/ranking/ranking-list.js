/* eslint react/prefer-stateless-function: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getRankingListFromServerThunkerator } from '../../store'
import {
  RankingListNameHeader,
  CourseNameLink,
} from '../../components'

class RankingList extends React.Component {

  componentDidMount () {
    const rankingListId = this.props.match.params.rankingListId
    this.props.fetchRankingList(rankingListId)
  }

  render () {
    const { activeRankingList, activeRankings } = this.props
    return (
      <div>
        <RankingListNameHeader
          rankingList={activeRankingList}
        />
        {
          activeRankings.map(ranking => <CourseNameLink key={ranking.id} course={ranking.course} />)
        }
      </div>
    )
  }
}

const mapStateToProps = ({ activeRankingList, activeRankings }) => ({ activeRankingList, activeRankings })

const mapDispatchToProps = (dispatch) => ({
  fetchRankingList: (id) => {
    dispatch(getRankingListFromServerThunkerator(id))},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RankingList))
