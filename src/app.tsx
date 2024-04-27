import { AgGridReact } from 'ag-grid-react';
import { isNull } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Header, List } from './components';
import { getChart, getFoodItems } from './firebase-api';
import { Chart, FoodItems } from './types';
export const App = () => {
  // Ref.
  const gridRef = useRef<AgGridReact<Chart> | null>(null);

  // States.
  const [rowData, setRowData] = useState<Chart[] | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItems>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  // useEffects.
  useEffect(() => {
    // Seed Data functions.
    // fillDefaultFoodItems();
    // fillDefaultChart();

    getChart().then((chart) => setRowData(chart));
    getFoodItems().then((foodItems) => setFoodItems(foodItems as FoodItems));
    gridRef.current?.api?.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    if (!isNull(foodItems)) {
      // console.log(foodItems);
    }
  }, [foodItems]);

  // Handlers.
  const updateChartFirebase = (row) => {};

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

  // Table Helpers.
  const columnDefs: any = useMemo(() => {
    return [
      {
        field: 'id',
        hide: true,
        flex: 1,
        editable: true,
      },
      { field: 'day', flex: 1 },
      {
        field: 'breakfast',
        flex: 1,
        editable: true,
        singleClickEdit: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: () => ({ values: foodItems.breakfast }),
      },
      {
        field: 'lunch',
        flex: 1,
        editable: true,
        singleClickEdit: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: () => ({ values: foodItems.lunch }),
      },
      {
        field: 'dinner',
        flex: 1,
        editable: true,
        singleClickEdit: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: () => ({ values: foodItems.dinner }),
      },
    ];
  }, [foodItems]);

  return (
    <div className="fcg">
      <Header />
      <div
        className="fcg-grid ag-theme-quartz" // applying the grid theme
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
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
