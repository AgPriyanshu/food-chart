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
    'Omelet',
  ],
  lunch: [
    'Tadka Dahi and Rice',
    'Kadhi',
    'Paneer Makhani',
    'Kadhai Paneer',
    'Baingan ka bharta',
    'Dal',
    'Pulao',
  ],
  dinner: [
    'Tadka Dahi and Rice',
    'Kadhi',
    'Paneer Makhani',
    'Kadhai Paneer',
    'Chinese',
    'Dal',
    'Pulao',
    'Chane ki Daal + Jeera Aloo',
    'Kofte',
    'Masala Khichdi',
  ],
};
