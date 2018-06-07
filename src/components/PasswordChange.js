import React, { Component } from 'react'
import { Form, Col, FormControl, FormGroup } from 'react-bootstrap'

import { auth } from '../firebase'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props)

    this.state = { INITIAL_STATE }
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ INITIAL_STATE }))
      })
      .catch(error => {
        this.setState({error: error})
      });

    event.preventDefault()
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === ''

    return (
      <Form horizontal onSubmit={this.onSubmit.bind(this)} >
					 <FormGroup controlId="formHorizontalEmailChangePassword">
							<Col md={2}>New Password</Col>
							<Col md={8}>
								<FormControl type="password" placeholder="New Password" value={passwordOne} onChange={e => this.setState({passwordOne: e.target.value})} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalPassword">
							<Col md={2}>Confirm Password</Col>
							<Col md={8}>
								<FormControl type="password" placeholder="Confirm Password" value={passwordTwo} onChange={e => this.setState({passwordTwo: e.target.value})} />
							</Col>
						</FormGroup>

						<FormGroup>
							<Col md={6}>
								<button type="submit" disabled={isInvalid} >Reset Password</button>
							</Col>
						</FormGroup>
						{ error && <p>{error.message}</p> }

					</Form>
    );
  }
}

export default PasswordChangeForm;