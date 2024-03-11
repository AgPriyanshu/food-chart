import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'food-chart-generator.firebaseapp.com',
  projectId: 'food-chart-generator',
  storageBucket: 'food-chart-generator.appspot.com',
  messagingSenderId: '138841955346',
  appId: '1:138841955346:web:c11dd44daeb5c4d5ce0ccb',
  measurementId: 'G-C1F8X40W7R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
