import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut'

import * as routes from '../routes/routes'

const Navigation = ({authUser}) => 
	<div>
	{ authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
	</div>

	const NavigationAuth = () =>
	<div>
		<ul>
				<li><Link to={routes.LANDING}>Landing</Link></li>
				<li><Link to={routes.HOME}>Home</Link></li>
				<li><Link to={routes.ACCOUNT}>Account</Link></li>
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