import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export const login = ({ username, password }, callback) => {
  signInWithEmailAndPassword(auth, username, password)
    .then((user) => {
      callback(true, user.user.uid);
    })
    .catch((error) => {
      callback(false);
    });
};
export const registerUser = (username, password) => {
  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log({ user });

      if (user) {
        setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          email: user.email,
        })
          .then((docRef) => {
            console.log(docRef);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // ...
    })
    .catch((error) => {
      const { code, message } = error;
      console.error(code, message);
      // ..
    });
};
