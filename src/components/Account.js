import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { PasswordForgetForm } from './PasswordForget'
import PasswordChangeForm from './PasswordChange'
import withAuthorization from './withAuthorization'
import { Form, Col, FormControl, FormGroup, DropdownButton, MenuItem, ButtonToolbar, Button } from 'react-bootstrap'
import { db } from '../firebase'


const Account = props => { 
  const { authUser, user, setProfile } = props
    return (
    <div>
      <h2>Account: {authUser.email} </h2>
      <PasswordForgetForm />
      <PasswordChangeForm />
      <ProfileInfo user={user}
      authUser={authUser}
      setProfile={setProfile} />
    </div>
    )
}

class ProfileInfo extends Component {

  constructor(props) {
    super(props)
    const { user } = props
    const INITIAL_PROFILE = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      employed: user.employed,
      employer: user.employer,
      industry: user.industry,
      profilePic: '',
      interests: ''
    }
    this.state = INITIAL_PROFILE
    this.updateProfile = this.updateProfile.bind(this)
  }

  componentDidMount() {
    const { user, authUser } = this.props
    // console.log(this.props)
  }

  updateProfile(event) {
    event.preventDefault()
    const { 
      employed,
      employer,
      industry
    } = this.state
    const profileObj = {
      employed,
      employer,
      industry
    }
    const { authUser, setProfile } = this.props
    const userId = authUser.uid
    // Update the data object on Firebase for this particular user
    db.updateProfile(userId,profileObj).then(() => console.log('sutheth'))

  }

  render() {
    console.log('state in render()', this.state)
    const {
      firstName,
      lastName,
      email,
      employed,
      employer,
      industry,
      profilePic,
      interests
    } = this.state

    return (
      <div>
        <Form horizontal onSubmit={this.updateProfile}>
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
          <h3>Job Information</h3>
          <FormGroup>
            <Col md={2}><p>Employment Status</p></Col>
            <Col md={8}>
            <ButtonToolbar>
              <DropdownButton bsStyle="default" title={employed === '' ? 'Select one' : employed} id="dropdown-employed-status">
                <MenuItem eventKey="Happily Employed" onSelect={e => this.setState({employed: e})}>Happily Employed</MenuItem>
                <MenuItem eventKey="Employed and seeking opportunities" onSelect={e => this.setState({employed: e})}>Employed and seeking opportunities</MenuItem>
                <MenuItem eventKey="Free agent and looking" onSelect={e => this.setState({employed: e})} >Free agent and looking</MenuItem>
              </DropdownButton>
            </ButtonToolbar>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col md={2}>Employer</Col>
            <Col md={8}>
              <FormControl type="text" name="employer" placeholder="Who do you work for?" value={employer} onChange={e => this.setState({employer: e.target.value})} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col md={2}>Industry</Col>
            <Col md={8}>
            <ButtonToolbar>
              <DropdownButton bsStyle="default" title={industry === '' ? 'Select one' : industry} id="dropdown-industry" onSelect={e => this.setState({industry:e})}>
                <MenuItem eventKey="Technology" >Technology</MenuItem>
                <MenuItem eventKey="Marketing" >Marketing</MenuItem>
                <MenuItem eventKey="Creative" >Creative</MenuItem>
              </DropdownButton>
            </ButtonToolbar>
            </Col>
          </FormGroup>
          <Button type="submit">Save</Button>
        </Form>
      </div>
    )
  }
}

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    user: state.userState.user
  })

  const mapDispatchToProps = dispatch => ({
    setProfile: profile => dispatch({
      type: 'SET_PROFILE',
      profile
    })
  })

const authCondition = authUser => !!authUser

export default compose(withAuthorization(authCondition),connect(mapStateToProps,mapDispatchToProps))(Account)