import {
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { defaultFoodItems, getUserId } from './constants';
import { chartRowsGeneratorFromFoodItems } from './helpers';
import { Chart, FoodItems } from './types';
import { db } from './utils/firebase';

export const getChart = async (
  userId: string | null = getUserId(),
): Promise<Chart | null> => {
  const collectionDocs = query(
    collection(db, 'charts'),
    where('userId', '==', userId),
  );

  const querySnapshot = await getDocs(collectionDocs);
  if (querySnapshot.docs.length > 0) {
    return querySnapshot.docs[0].get('chart');
  }

  return null;
};

export const getFoodItems = async (
  userId: string | null = getUserId(),
): Promise<DocumentData | null> => {
  const collectionDocs = query(
    collection(db, 'foodItems'),
    where('userId', '==', userId),
  );
  const querySnapshot = await getDocs(collectionDocs);
  if (querySnapshot.docs.length > 0) {
    return querySnapshot.docs[0].data();
  }
  return null;
};

export const updateChart = async (
  chart: Chart,
  userId: string | null = getUserId(),
): Promise<any> => {
  const collectionDocs = query(
    collection(db, 'charts'),
    where('userId', '==', userId),
  );
  const querySnapshot = await getDocs(collectionDocs);
  return setDoc(querySnapshot.docs[0].ref, {
    chart: chart,
    userId: userId,
  });
};

export const updateFoodItems = async (
  foodItems: FoodItems,
  userId: string | null = getUserId(),
): Promise<any> => {
  const collectionDocs = query(
    collection(db, 'foodItems'),
    where('userId', '==', userId),
  );
  const querySnapshot = await getDocs(collectionDocs);
  if (querySnapshot.docs.length > 0) {
    return setDoc(querySnapshot.docs[0].ref, {
      ...foodItems,
      userId: userId,
    });
  }
};

export const fillDefaultChart = async (
  userId: string | null = getUserId(),
): Promise<Chart> => {
  const collectionDocs = query(
    collection(db, 'charts'),
    where('userId', '==', userId),
  );
  const querySnapshot = await getDocs(collectionDocs);
  const chart = chartRowsGeneratorFromFoodItems(defaultFoodItems);
  if (querySnapshot.docs.length > 0) {
    setDoc(querySnapshot.docs[0].ref, {
      chart,
      userId: userId,
    });
  } else {
    if (userId) {
      setDoc(doc(db, 'charts', userId), {
        chart,
        userId: userId,
      });
    }
  }
  return chart;
};

export const fillDefaultFoodItems = async (
  userId: string | null = getUserId(),
): Promise<FoodItems> => {
  const collectionDocs = query(
    collection(db, 'foodItems'),
    where('userId', '==', userId),
  );
  const querySnapshot = await getDocs(collectionDocs);
  if (querySnapshot.docs.length > 0) {
    setDoc(querySnapshot.docs[0].ref, {
      ...defaultFoodItems,
      userId: userId,
    });
  } else {
    if (userId) {
      setDoc(doc(db, 'foodItems', userId), {
        ...defaultFoodItems,
        userId: userId,
      });
    }
  }
  return defaultFoodItems;
};
