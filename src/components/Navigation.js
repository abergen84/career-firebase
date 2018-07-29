import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SignOutButton from './SignOut'
import * as routes from '../routes/routes'

  
const Navigation = props => {
  const { authUser, user } = props
  return (
    <div>
      { authUser ? <NavigationAuth user={user} /> : <NavigationNonAuth /> }
    </div>
  )
}

  const NavigationAuth = ({user}) => {
    return (
      <div>
        <ul>
          <li><Link to={routes.LANDING}>Landing</Link></li>
          <li><Link to={routes.HOME}>Home</Link></li>
          <li><Link to={routes.ACCOUNT}>Account</Link></li>
          { user.isAdmin ? <li><Link to={routes.ADMIN}>Admin</Link></li> : '' }
          { user.type === 'journalist' ? <li><Link to={routes.ADMIN}>Write article</Link></li> : '' }
          <li><SignOutButton /></li>
          </ul>
      </div>
    )
  }
	
	const NavigationNonAuth = () => 
	<div>
		<ul>
			<li><Link to={routes.SIGNUP}>Sign Up</Link></li>
			<li><Link to={routes.SIGNIN}>Sign In</Link></li>
			<li><Link to={routes.LANDING}>Landing</Link></li>
		</ul>
	</div>

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    user: state.userState.user
  })

export default connect(mapStateToProps)(Navigation)