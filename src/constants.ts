import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'day', headerName: 'Day', headerClassName: 'table-header', flex: 1 },
  {
    field: 'breakfast',
    headerName: 'Breakfast',
    headerClassName: 'table-header',
    flex: 2,
  },
  {
    field: 'lunch',
    headerName: 'Lunch',
    headerClassName: 'table-header',
    flex: 2,
  },
  {
    field: 'dinner',
    headerName: 'Dinner',
    headerClassName: 'table-header',
    flex: 2,
  },
];

export const userId = localStorage.getItem('userId');
