const INITIAL_STATE = {
  user: {},
  users: {}
}

const applySetUsers = (state, action) => ({
  ...state,
  users: action.users
})

const applySetUser = (state, action) => ({
  ...state,
  user: action.user
})

const setProfile = (state, action) => ({
  ...state,
  profile: action.profile
})

function userReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'USERS_SET': {
      return applySetUsers(state, action)
    }
    case 'USER_SET': {
      return applySetUser(state, action)
    }
    case 'SET_PROFILE': {
      return setProfile(state, action)
    }
    default: return state
  }
}

export default userReducer