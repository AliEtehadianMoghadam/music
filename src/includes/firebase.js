import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {
  collection, addDoc, doc, setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAY4OeGqyoSnRX3xfEeaI-gjXsOZmqoj8k',
  authDomain: 'music-1d702.firebaseapp.com',
  projectId: 'music-1d702',
  storageBucket: 'music-1d702.appspot.com',
  appId: '1:747694195988:web:40b11cf7aceeb5cc67ee01',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const db = getDatabase();
const auth = getAuth();
// const usersCollection = collection(db, 'users')
// const songsCollection = collection(db, 'songs')
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  storage,
  ref,
  uploadBytesResumable,
  // songsCollection,
  // usersCollection,
  addDoc,
  collection,
  doc,
  setDoc,
};
