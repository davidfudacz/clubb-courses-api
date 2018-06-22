import React from 'react'
import { connect } from 'react-redux'
import { ClubNameHeader, ClubNameLink } from '../components'

class Home extends React.Component {
  render () {
    return (
      <div>
        {
          this.props.clubs.map(club => {
            return (
              <div key={club.id}>
              <ClubNameHeader
                club={club}
              />
              <ClubNameLink
                club={club}
              />
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

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Home)
