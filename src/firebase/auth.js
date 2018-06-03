import { auth } from './firebase'

//Sign Up
export const createUser = (email,password) => 
	 auth.createUserWithEmailAndPassword(email,password)


//Sign In
export const signInUser = (email,password) => 
	auth.signInWithEmailAndPassword(email,password)


//Sign Out
export const signOutUser = () => 
	auth.signOut()


//Reset Password
export const resetPassword = (email) => 
	auth.sendPasswordResetEmail(email)


//Change Password
export const changePassword = (password) => 
	auth.currentUser.updatePassword(password)

//See User Info

export const seeUserInfo = _ => 
	auth.currentUser