import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut'
import AuthUserContext from './AuthUserContext'

import * as routes from '../routes/routes'

const Navigation = () => 
	<AuthUserContext.Consumer>
	{ authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
	</AuthUserContext.Consumer>

	const NavigationAuth = () =>
	<div>
		<ul>
				<li><Link to={routes.LANDING}>Landing</Link></li>
				<li><Link to={routes.HOME}>Home</Link></li>
				<li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><Link to={routes.ADMIN}>Admin</Link></li>
				<li><SignOutButton /></li>
			</ul>
	</div>
	
	const NavigationNonAuth = () => 
	<div>
		<ul>
			<li><Link to={routes.SIGNUP}>Sign Up</Link></li>
			<li><Link to={routes.SIGNIN}>Sign In</Link></li>
			<li><Link to={routes.LANDING}>Landing</Link></li>
		</ul>
	</div>

export default Navigation