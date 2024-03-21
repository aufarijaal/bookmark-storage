// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDK8mCCpBbdKGzqrq_ORbrFcN0niK_WpKU',
  authDomain: 'bookmark-storage-38d5a.firebaseapp.com',
  projectId: 'bookmark-storage-38d5a',
  storageBucket: 'bookmark-storage-38d5a.appspot.com',
  messagingSenderId: '544988222072',
  appId: '1:544988222072:web:44cae4481d180c5974538d',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const googleProvider = new GoogleAuthProvider()
