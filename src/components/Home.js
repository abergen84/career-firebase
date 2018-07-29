import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthorization from './withAuthorization'
import { db, auth } from '../firebase'
import * as routes from '../routes/routes'
import { Link } from 'react-router-dom'


class Home extends Component {
  componentDidMount() {
    console.log('home comp - this.props', this.props)
    const { onSetUsers, setUser } = this.props
    const userId  = auth.seeUserInfo().uid
    // console.log(auth.seeUserInfo())

    db.getUser(userId).then(user => setUser(user.val()))
    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()))
  }

  render() {
    // const { users } = this.props
    const { user } = this.props 

    return (
      <div>
        <h1>Home</h1>
        <p>The home page is accessible by every signed in user</p>
        { user && <User user={user} /> }
        {/* { users && <UserList users={users} /> } */}
      </div>
    )
  }

}

const User = ({user}) => {
  // console.log('the user info', user)
  const { firstName } = user
  return (
    <div>
      <h1>Welcome, {firstName} </h1>
      <h3>Tell us a little bit about yourself. Make sure to fill in your <Link to={routes.ACCOUNT}>profile.</Link></h3>
    </div>
  )
}

// const UserList = ({ users }) => {
//   console.log('userlist func', users)
//   return (
//     <div>
//       <h2>List of Emails of Users</h2>
//       <p>(Saved on Sign Up in Firebase Database)</p>

//       {Object.keys(users).map(key =>
//         <div key={key}>
//           {users[key].email}
//           {users[key].firstName}
//         </div>
//       )}
//     </div>
//   )
// }

  const mapStateToProps = state => ({
    user: state.userState.user,
    users: state.userState.users
  })

  const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch({ type: 'USER_SET', user }),
    onSetUsers: users => dispatch({ type: 'USERS_SET', users })
  })

  const authCondition = authUser => !!authUser


export default compose(withAuthorization(authCondition), connect(mapStateToProps, mapDispatchToProps))(Home)