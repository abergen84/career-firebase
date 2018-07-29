import React, { Component } from 'react'
import Header from './Header'
import { Form, Col, FormControl, FormGroup } from 'react-bootstrap'
import { auth, db } from '../firebase'
import { withRouter } from 'react-router-dom';

import * as routes from '../routes/routes'


const INITIAL_STATE_USER = {
	firstName: '',
	lastName: '',
	email: '',
	passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  type: 'user',
	error: null
}

const INITIAL_STATE_CO = {
  company: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isCompany: true,
  error: null
}

class SignUp extends Component {
  constructor({history}){
    super()
    this.state = {
      company: false,
      history: history
    }
  }

  toggle() {
    this.state.company ? this.setState({company: false}) : this.setState({company: true})
  }

  render(){
    return (
      <div className="register">
      { this.state.company ? <button onClick={this.toggle.bind(this)}>User? Click here</button> : <button onClick={this.toggle.bind(this)}>Company? Click here</button> } 
        <Header />
      { this.state.company ? <RegisterCredsCompany history={this.state.history} /> : <RegisterCredsUser history={this.state.history} /> }
      </div>
    )
  }
}


class RegisterCredsUser extends Component {

	constructor(props) {
		super(props)
    this.state = INITIAL_STATE_USER
    
    this.register = this.register.bind(this)
	}
		
	register(event) {
		event.preventDefault()
	
		const {
			firstName,
			lastName,
      email,
      admin,
      type,
			passwordOne
		} = this.state

		const {history} = this.props
		
		auth.createUser(email,passwordOne)
			.then((authUser) => {
        db.createUser(authUser.user.uid,firstName,lastName,email,admin,type)
          .then(() => {
            this.setState(() => ({INITIAL_STATE_USER}))
            history.push(routes.HOME)
          })
			})
			.catch(error => {
				this.setState({error: error})
			})
	}	

	render() {
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
				<h3>Register as User</h3>
					<Form horizontal onSubmit={this.register}>
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

class RegisterCredsCompany extends Component {

  constructor(props) {
		super(props)
    this.state = INITIAL_STATE_CO
    
    this.register = this.register.bind(this)
	}
		
	register(event) {
		event.preventDefault()
	
		const {
			company,
			email,
			passwordOne
		} = this.state

		const {history} = this.props
		
		auth.createUser(email,passwordOne)
			.then((authUser) => {
        db.createCompany(authUser.user.uid,company,email)
          .then(() => {
            this.setState(() => ({INITIAL_STATE_CO}))
            history.push(routes.HOME)
          })
			})
			.catch(error => {
				this.setState({error: error})
			})
	}	

	render() {
		const {
			company,
			email,
			passwordOne,
			passwordTwo,
			error
		} = this.state

		const isInvalid = 
			passwordOne !== passwordTwo || passwordOne === '' || email === '' || company === ''

    return (
      <div className="register">
				<div className="register-form">
				<h3>Register as Company</h3>
					<Form horizontal onSubmit={this.register}>
					<FormGroup>
						<Col md={2}>Company Name</Col>
						<Col md={8}>
							<FormControl type="text" name="company" placeholder="Company Name" value={company} onChange={e => this.setState({company: e.target.value})} />
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
	RegisterCredsUser
}