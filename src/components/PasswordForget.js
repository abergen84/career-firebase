import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Col, FormControl, FormGroup } from 'react-bootstrap'
import * as routes from '../routes/routes'

import { auth } from '../firebase'

const PasswordForget = () => 
	<div>
		<h1>Password Forget</h1>
    <PasswordForgetForm />
	</div>

  const INITIAL_STATE = {
    email: '',
    error: null
  }

  class PasswordForgetForm extends Component {
    constructor(props) {
      super(props)
      this.state = INITIAL_STATE
    }

    onSubmit(event) {
      event.preventDefault()
      const {email} = this.state

      auth.resetPassword(email)
        .then(() => {
          this.setState(() => ({INITIAL_STATE}))
        })
        .catch(error => {
          this.setState({error: error})
        })
    }

    render() {
      const {email,error} = this.state

      const isInvalid = email === ''

      return (
        <Form horizontal onSubmit={this.onSubmit.bind(this)} >
        <FormGroup controlId="formHorizontalEmailForgetPassword">
           <Col md={2}>Email</Col>
           <Col md={8}>
             <FormControl type="email" name="email" placeholder="Email" value={email} onChange={e => this.setState({email: e.target.value})} />
           </Col>
         </FormGroup>

         <FormGroup>
           <Col md={6}>
             <button type="submit" disabled={isInvalid} >Reset my Password</button>
           </Col>
         </FormGroup>
         { error && <p>{error.message}</p> }

       </Form>
      )
    }
  }

  const PasswordForgetLink = () => 
    <div>
      <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
    </div>
  

export default PasswordForget

export {
  PasswordForgetForm,
  PasswordForgetLink
}