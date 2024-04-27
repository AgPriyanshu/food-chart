import {
  DocumentData,
  collection,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { defaultFoodItems, userId } from './constants';
import { chartRowsGeneratorFromFoodItems } from './helpers';
import { Chart } from './types';
import { db } from './utils/firebase';

export const getChart = async (): Promise<Chart[]> => {
  const collectionDocs = query(
    collection(db, 'charts'),
    where('userId', '==', 'i0IbkKf856QXFId434xiy86UROh1'),
  );
  const querySnapshot = await getDocs(collectionDocs);
  return querySnapshot.docs[0].get('chart');
};

export const getFoodItems = async (): Promise<DocumentData> => {
  const collectionDocs = query(
    collection(db, 'foodItems'),
    where('userId', '==', 'i0IbkKf856QXFId434xiy86UROh1'),
  );
  const querySnapshot = await getDocs(collectionDocs);
  return querySnapshot.docs[0].data();
};

export const fillDefaultChart = async (): Promise<any> => {
  const collectionDocs = query(
    collection(db, 'charts'),
    where('userId', '==', 'i0IbkKf856QXFId434xiy86UROh1'),
  );
  const querySnapshot = await getDocs(collectionDocs);
  return setDoc(querySnapshot.docs[0].ref, {
    chart: chartRowsGeneratorFromFoodItems(defaultFoodItems),
    userId,
  });
};

export const fillDefaultFoodItems = async (): Promise<any> => {
  const collectionDocs = query(
    collection(db, 'foodItems'),
    where('userId', '==', 'i0IbkKf856QXFId434xiy86UROh1'),
  );
  const querySnapshot = await getDocs(collectionDocs);
  return setDoc(querySnapshot.docs[0].ref, {
    ...defaultFoodItems,
    userId,
  });
};
