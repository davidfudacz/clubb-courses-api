import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Home,
  Club,
  RankingList,
  ArchitectForm,
  ClubForm,
  CourseForm,
  ClubWizardForm,
} from './components'

/**
 * COMPONENT
 */

class Routes extends React.Component {
  componentDidMount () {
    this.props.initialize()
  }

  render () {
    return (
      <div className="mainContent">
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/clubs/:clubId/:parsedClubName/:courseId" component={Club} />
        <Route path="/clubs/:clubId/:parsedClubName" component={Club} />
        <Route path="/ranking-lists/:rankingListId" component={RankingList} />
        <Route path="/input/architect" component={ArchitectForm} />
        <Route path="/input/club" component={ClubForm} />
        <Route path="/input/course" component={CourseForm} />
        <Route path="/input/wizard" component={ClubWizardForm} />
        <Route path="/" component={Home} />
      </Switch>
        </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = ({ clubs }) => ({ clubs })

const mapDispatchToProps = (dispatch) => ({
  initialize: () => {
  }
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
}
