import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  getAllClubsFromServerThunkerator,
  getAllCoursesFromServerThunkerator
} from './store'
import {
  Home,
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
    dispatch(getAllClubsFromServerThunkerator())
    dispatch(getAllCoursesFromServerThunkerator())
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
