import { AgGridReact } from 'ag-grid-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { FoodItems, Header, List } from './components';
import { Chart } from './types';
import { db } from './utils/firebase';
import { Button } from 'react-bootstrap';

const getChart = async (): Promise<Chart[]> => {
  const collectionDocs = query(
    collection(db, 'charts'),
    where('userId', '==', 'i0IbkKf856QXFId434xiy86UROh1'),
  );
  const querySnapshot = await getDocs(collectionDocs);
  return querySnapshot.docs[0].get('chart');
};

const getFoodItems = async (): Promise<FoodItems> => {
  const collectionDocs = query(
    collection(db, 'foodItems'),
    where('userId', '==', 'i0IbkKf856QXFId434xiy86UROh1'),
  );
  const querySnapshot = await getDocs(collectionDocs);
  return querySnapshot.docs[0].data();
};

export const App = () => {
  // Ref.
  const gridRef = useRef<AgGridReact<Chart> | null>(null);
  // States.
  const [chartRows, setRowData] = useState<Chart[] | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItems | null>(null);

  // useEffects.
  useEffect(() => {
    getChart().then((chart) => setRowData(chart));
    getFoodItems().then((foodItems) => setFoodItems(foodItems));
    gridRef.current?.api?.sizeColumnsToFit();
  }, []);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit(); // Size columns to fit initially
    window.addEventListener('resize', () => params.api.sizeColumnsToFit());
  };

  const autoSizeAll = (skipHeader) => {
    const allColumnIds: any[] = [];
    const columns = gridRef.current?.api.getColumns();
    if (columns) {
      columns.forEach((column: any) => allColumnIds.push(column.colId));
      gridRef.current?.api.autoSizeColumns(allColumnIds, skipHeader);
    }
  };

  return (
    <div className="fcg">
      <Header />
      <div
        className="fcg-grid ag-theme-quartz" // applying the grid theme
      >
        <AgGridReact
          columnDefs={[
            { field: 'id', hide: true, flex: 1 },
            { field: 'day', flex: 1 },
            { field: 'breakfast', flex: 1 },
            { field: 'lunch', flex: 1 },
            { field: 'dinner', flex: 1 },
          ]}
          rowData={chartRows}
          domLayout="autoHeight"
          ref={gridRef}
          onGridReady={onGridReady}
        />
        <button onClick={() => autoSizeAll(false)} className="fcg-button">
          <span>Auto-Size Columns</span>
        </button>
      </div>
      <div className="fcg-lists">
        <List header="Breakfast" listItems={foodItems?.breakfast}></List>
        <List header="Lunch" listItems={foodItems?.lunch}></List>
        <List header="Dinner" listItems={foodItems?.dinner}></List>
      </div>
    </div>
  );
};
