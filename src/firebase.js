import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCaa10TOV0V36byyRWu-gHiGHnN8u0pQEw',
  authDomain: 'kafulluk-gurme.firebaseapp.com',
  projectId: 'kafulluk-gurme',
  storageBucket: 'kafulluk-gurme.firebasestorage.app',
  messagingSenderId: '423173579350',
  appId: '1:423173579350:web:b5940b0bb7b7f3c3afd1f7',
  measurementId: 'G-FJNZR0PCKM',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
