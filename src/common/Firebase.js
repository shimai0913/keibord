import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/analytics'

const config = {
  apiKey: process.env.REACT_APP_APP_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
}

console.log('config:', config)

export const firebaseApp = firebase.initializeApp(config)
export const db = firebaseApp.firestore()