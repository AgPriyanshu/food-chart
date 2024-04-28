import { isNil } from 'lodash';

export const getUserId = () => {
  const localUserId = localStorage.getItem('userId');
  if (isNil(localUserId)) {
    localStorage.setItem('userId', 'i0IbkKf856QXFId434xiy86UROh1');
    return localStorage.getItem('userId');
  }
  return localUserId;
};

export const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const lunchAndDinner = [
  'Tadka Dahi and Rice',
  'Kadhi with Pakoda',
  'Paneer Makhani',
  'Kadhai Paneer',
  'Baingan ka bharta',
  'Mix Dal',
  'Yellow Dal',
  'Chane ki Dal',
  'Black Dal',
  'Dal Makhni',
  'Chole',
  'Dry Paneer',
  'Rajma',
  'Bhindi',
  'Aloo Gobhi',
  'Mix veg',
  'Aloo Beans',
  'Jeera Aloo',
  'Methi Aloo',
  'Soya Bean Gravy',
  'Loki Kofte',
  'Masala Khichdi',
  'Aloo Tamatar',
  'Chinese Soya Bean',
  'Chowmein',
  'Chilly Potato',
  'French Fries',
  'Fried Rice',
  'Manchurian Balls Gravy',
];

export const defaultFoodItems = {
  breakfast: [
    'Upma',
    'Vegetable Sandwich',
    'Paneer Sandwich',
    'Utpam',
    'Gobi Parantha',
    'Aloo Parantha',
    'Dal Parantha',
    'Pyaaz Parantha',
    'Poha',
    'Bread Omelet',
    'French Omelet',
    'Idli with Chutney',
    'Idli Fry',
    'Bread Poach',
    'Besan Chilla',
  ],
  lunch: lunchAndDinner,
  dinner: lunchAndDinner,
};
