import React, { Component } from 'react'
import Header from './Header'
import { Form, Col, FormControl, FormGroup } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase'

import * as routes from '../routes/routes'


const SignIn = ({history}) => 
	<div className="login">
		<Header />
		<LoginCreds history={history} />
	</div>	

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
}

class LoginCreds extends Component {

	constructor(props) {
		super(props)
		this.state = INITIAL_STATE;
		// console.log(this.state);
	}
	
	login(event){
		event.preventDefault()
		// const email = this.state.email,
		// const password = this.state.password
		const {email, password} = this.state
		const {history} = this.props

		auth.signInUser(email,password)
			.then(() => {
				this.setState(() => ({INITIAL_STATE}))
				const user = auth.seeUserInfo()
				console.log('user', user)
				history.push(routes.HOME)
			})
			.catch(error => {
				this.setState({error: error})
			})

		// ACTIONS.loginUser(event.currentTarget.email.value, event.currentTarget.password.value)
	}

	render(){

		const {email,password,error} = this.state

		const isInvalid = password === '' || email === ''

		return (
			<div className="login">
				<div className="login-form">
				<h3>Login</h3>
					<Form horizontal onSubmit={this.login.bind(this)} >
					 <FormGroup controlId="formHorizontalEmail">
							<Col md={2}>Email</Col>
							<Col md={8}>
								<FormControl type="email" name="email" placeholder="Email" value={email} onChange={e => this.setState({email: e.target.value})} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalPassword">
							<Col md={2}>Password</Col>
							<Col md={8}>
								<FormControl type="password" name="password" placeholder="Password" value={password} onChange={e => this.setState({password: e.target.value})} />
							</Col>
						</FormGroup>

						<FormGroup>
							<Col md={6}>
								<button type="submit" disabled={isInvalid} >Login</button>
							</Col>
						</FormGroup>
						{ error && <p>{error.message}</p> }

					</Form>
				</div>
			</div>
			)
	}
}

const SignInLink = () => 
	<div>
		<h3>Don't have an account?</h3>
		<Link to={routes.SIGNUP}>Sign Up</Link>
	</div>


export default withRouter(SignIn)

export {
	LoginCreds,
	SignInLink
}