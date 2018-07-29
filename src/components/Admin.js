import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { compose } from 'recompose'
// import AuthUserContext from './AuthUserContext';
// import withAuthorization from './withAuthorization';

const mapStateToProps = state =>   
({
  // authUser: state.sessionState.authUser,
  user: state.userState.user,
  users: state.userState.users
})

const authCondition = user => 
user && user.isAdmin === true;

const Admin = (props) => {
  console.log('users', props)
  const { users } = props
  // console.log('user', user)
  return (
    authCondition(props.user) ? <AdminAccept users={users} /> : <AdminReject />      
  )
}

class AdminAccept extends Component {

  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    console.log('this.props', this.props)
  }


  render() {
    const { users } = this.props
    return (
      <div>
        <h1>Admin</h1>
        <p>Admin rights granted.</p>
        <h1>List of registered users</h1>
        {Object.keys(users).map(key => <p key={key}>{users[key].email}</p>)}
      </div>
    )
  }
}
  

const AdminReject = () =>
  <div>
    <h1>Admin</h1>
    <p>Restricted area! Only users with the admin rule are authorized.</p>
  </div>




// export default compose(
//   withAuthorization(authCondition),
//   connect(mapStateToProps))(Admin)

export default connect(mapStateToProps)(Admin)