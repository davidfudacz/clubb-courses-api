import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Home,
} from './components'

/**
 * COMPONENT
 */
const Routes = () => {
  return (
    <div className="mainContent">
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route path="/" component={Home} />
    </Switch>
      </div>
  )
}

/**
 * CONTAINER
 */
const mapState = null

const mapDispatch = null

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
}
