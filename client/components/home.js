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
          this.props.clubs.map(club => {
            return (
              <div key={club.id}>
              <p>{club.name}</p>
              {
                club.courses.length > 1
                  ? club.courses.map(course => <p style={{marginLeft: 10}} key={course.id}>{course.name}</p>)
                  : null
              }
              </div>
            )
          })
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
