/* eslint react/prefer-stateless-function: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getRankingListFromServerThunkerator,
  clearRankingList,
  clearRankings,
} from '../../store'
import {
  RankingListNameHeader,
} from '../../components'
import Row from './row'
import { tableStyle, thStyle } from '../../styles'
import { _sortRankingsByRank } from '../../utilities'

class RankingList extends React.Component {

  componentDidMount () {
    const rankingListId = this.props.match.params.rankingListId
    this.props.fetchRankingList(rankingListId)
  }

  componentWillUnmount () {
    this.props.clearRankingList()
  }

  render () {
    const { activeRankingList, activeRankings } = this.props
    return (
      <div>
        <RankingListNameHeader
          rankingList={activeRankingList}
        />
    <div>
      <h3>Front/Back Ratings and Slopes</h3>
      <table style={tableStyle}>
        <tbody>
        <tr>
          <th style={thStyle}>Rank</th>
          <th style={thStyle}>Course</th>
          <th style={thStyle}>Year</th>
        </tr>
        {
          _sortRankingsByRank(activeRankings).map(ranking => {
            return (
              <Row key={ranking.id} ranking={ranking} />
            )
          })
        }
        </tbody>
      </table>
    </div>
      </div>
    )
  }
}

const mapStateToProps = ({ activeRankingList, activeRankings }) => ({ activeRankingList, activeRankings })

const mapDispatchToProps = (dispatch) => ({
  fetchRankingList: (id) => dispatch(getRankingListFromServerThunkerator(id)),
  clearRankingList: () => {
    dispatch(clearRankingList())
    dispatch(clearRankings())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RankingList))
