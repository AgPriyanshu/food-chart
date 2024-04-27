export type Chart = {
  id: string;
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
};

export enum FoodType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
}

export type FoodItem = {
  type: string;
  value: string;
};

export type FoodData = {
  [key in WeekDay]: { id: string; foodItems: FoodItem[] };
};

export enum WeekDay {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
}

export type ChartRowItem = {
  id: number;
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
};

export type FoodItems = {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
};
