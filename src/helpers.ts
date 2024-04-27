import { cloneDeep, pull } from 'lodash';
import { weekdays } from './constants';
import { ChartRowItem, FoodItems } from './types';
import { getRandomValue } from './utils';

export const chartRowsGeneratorFromFoodItems = (
  foodItems: FoodItems | null,
) => {
  const rows: ChartRowItem[] = [];
  if (foodItems) {
    const {
      breakfast: breakfastItems,
      lunch: lunchItems,
      dinner: dinnerItems,
    } = cloneDeep(foodItems);
    const selectedBreakfast: any[] = [];
    const selectedLunch: any[] = [];
    const selectedDinner: any[] = [];
    for (let i = 0; i < 7; i++) {
      let breakfast = '',
        lunch = '',
        dinner = '';
      if (breakfastItems) {
        breakfast =
          getRandomValue(breakfastItems) ?? getRandomValue(selectedBreakfast);
        pull(breakfastItems, breakfast);
        selectedBreakfast.push(breakfast);
      }
      if (lunchItems) {
        lunch = getRandomValue(lunchItems) ?? getRandomValue(selectedLunch);
        pull(lunchItems, lunch);
        selectedLunch.push(breakfast);
      }
      if (dinnerItems) {
        dinner = getRandomValue(dinnerItems) ?? getRandomValue(selectedDinner);
        pull(dinnerItems, dinner);
        selectedDinner.push(breakfast);
      }
      rows[i] = { id: i, day: weekdays[i], breakfast, lunch, dinner };
    }
  }
  // Write to Sheets.
  // const API_KEY = 'AIzaSyDCtG_3aFqadJ2mznvGLdcH-UExRp9MkPY';
  // const SHEET_ID = '1zONHo6z_QuIhDbJpq91QCpDJ48js--jwgPvvs0wyCkM';
  // const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name
  // const chart_url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A2:D8?valueInputOption=RAW&key=${API_KEY}`;

  // const requestOptions = {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ values: rows }),
  // };
  // console.log(JSON.stringify({ values: rows }));
  // fetch(chart_url, requestOptions).then((response) => console.log(response));

  return rows;
};
