import React, { Component } from 'react'
import Header from './Header'
import { Form, Col, FormControl, FormGroup } from 'react-bootstrap'
import { auth, db } from '../firebase'
import { withRouter } from 'react-router-dom';

import * as routes from '../routes/routes'


const SignUp = ({history}) => 
	<div className="register">
		<Header />
		<RegisterCreds history={history} />
	</div>


const INITIAL_STATE = {
	firstName: '',
	lastName: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null
}


class RegisterCreds extends Component {

	constructor(props) {
		super(props)
		this.state = INITIAL_STATE
		// console.log(this.state);
		// console.log('authered', auth);
	}
		
	register(event) {
		event.preventDefault()
		// console.log('registered')
		// console.log('state', this.state)
		const {
			firstName,
			lastName,
			email,
			passwordOne
		} = this.state

		const {history} = this.props
		// console.log('history', history)
		// console.log('auth', auth);

		// firebase.auth().createUserWithEmailAndPassword(email,passwordOne)
		// createUser(email,passwordOne)
		auth.createUser(email,passwordOne)
			.then((authUser) => {
        db.createUser(authUser.user.uid, firstName,lastName, email)
          .then(() => {
            this.setState(() => ({INITIAL_STATE}))
            history.push(routes.HOME)
            // console.log('complete')
          })
			})
			.catch(error => {
				this.setState({error: error})
			})
		// ACTIONS.registerUser({
		// 	firstname: event.currentTarget.firstname.value
		// 	, lastname: event.currentTarget.lastname.value
		// 	, email: event.currentTarget.username.value
		// 	, password: event.currentTarget.password.value
		// })
	}	

	render() {
		//destructuring ES6
		const {
			firstName,
			lastName,
			email,
			passwordOne,
			passwordTwo,
			error
		} = this.state

		const isInvalid = 
			passwordOne !== passwordTwo || passwordOne === '' || email === '' || firstName === '' || lastName === ''

		return (
			<div className="register">
				<div className="register-form">
				<h3>Register</h3>
					<Form horizontal onSubmit={this.register.bind(this)}>
					<FormGroup>
						<Col md={2}>First Name</Col>
						<Col md={8}>
							<FormControl type="text" name="firstname" placeholder="First Name" value={firstName} onChange={e => this.setState({firstName: e.target.value})} />
						</Col>
					</FormGroup>
					<FormGroup>
						<Col md={2}>Last Name</Col>
						<Col md={8}>
							<FormControl type="text" name="lastname" placeholder="Last Name" value={lastName} onChange={e => this.setState({lastName: e.target.value})} />
						</Col>
					</FormGroup>
					<FormGroup>
						<Col md={2}>Email</Col>
						<Col md={8}>
							<FormControl type="email" name="username" placeholder="Email" value={email} onChange={e => this.setState({email: e.target.value})} />
						</Col>
					</FormGroup>
					<FormGroup>
						<Col md={2}>Password</Col>
						<Col md={8}>
							<FormControl type="password" name="password" placeholder="Password" value={passwordOne} onChange={e => this.setState({passwordOne: e.target.value})} />
						</Col>
					</FormGroup>
						<FormGroup>
						<Col md={2}>Password</Col>
						<Col md={8}>
							<FormControl type="password" name="password" placeholder="Password" value={passwordTwo} onChange={e => this.setState({passwordTwo: e.target.value})} />
						</Col>
					</FormGroup>
					<FormGroup>
						<Col md={6}>
							<button type="submit" disabled={isInvalid}>Register</button>
						</Col>
					</FormGroup>
					{ error && <p>{error.message}</p> }
					</Form>
				</div>
			</div>
			)
	}
}

export default withRouter(SignUp)

export {
	RegisterCreds
}