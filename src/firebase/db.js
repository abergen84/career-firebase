import { db } from './firebase'

export const createUser = (id,firstName,lastName,email,admin) =>
  db.ref(`users/${id}`).set({
    firstName,
    lastName,
    email,
    isAdmin: false
  })

export const createCompany = (id, company, email) =>
  db.ref(`companies/${id}`).set({
    company,
    email
  })

export const onceGetUsers = () =>
  db.ref('users').once('value')

export const getUser = (id) => 
  db.ref(`users/${id}`).once('value')

export const updateProfile = (id,profileObj) => {
  const { employed, employer, industry } = profileObj
  db.ref(`users/${id}`).update({
    employed,
    employer,
    industry
  })
}