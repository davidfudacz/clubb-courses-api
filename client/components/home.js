import React from 'react'
import { connect } from 'react-redux'
import { getAllClubsFromServerThunkerator } from '../store'


class Home extends React.Component {
  componentDidMount () {
    this.props.initialize()
  }

  render () {
    return (
      <div>
        {
          this.props.clubs.map(club => <p key={club.id}>{club.name}</p>)
        }
      </div>
    )
  }
}

const mapStateToProps = ({ clubs }) => ({ clubs })

const mapDispatchToProps = (dispatch) => ({
  initialize: () => {
    dispatch(getAllClubsFromServerThunkerator())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
