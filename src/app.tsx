import { AgGridReact } from 'ag-grid-react';
import { isNull, pull, pullAt } from 'lodash';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Form, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { Header, List } from './components';
import { getUserId, setUserId } from './constants';
import {
  fillDefaultChart,
  fillDefaultFoodItems,
  getChart,
  getFoodItems,
  updateChart,
  updateFoodItems,
} from './firebase-api';
import { Chart, ChartRowItem, FoodItems } from './types';
import { login } from './utils';
export const App = () => {
  // Ref.
  const gridRef = useRef<AgGridReact<ChartRowItem> | null>(null);

  // States.
  const [chartData, setChartData] = useState<Chart | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItems>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showFoodItemsList, setShowFoodItemsList] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(!getUserId());

  // useEffects.
  useEffect(() => {
    getChart().then((chart) => {
      if (isNull(chart)) {
        fillDefaultChart().then((chart) => setChartData(chart));
      } else {
        setChartData(chart);
      }
    });

    getFoodItems().then((foodItems) => {
      if (isNull(foodItems)) {
        fillDefaultFoodItems().then((foodItems) => setFoodItems(foodItems));
      }
      console.log(foodItems);
      setFoodItems(foodItems as FoodItems);
    });

    gridRef.current?.api?.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    if (!isNull(foodItems)) {
      // console.log(foodItems);
    }
  }, [foodItems]);

  // Handlers.
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

  const saveChart = () => {
    if (chartData && chartData.length > 0) {
      setIsSaving(true);
      updateChart(chartData).then(() => {
        setIsSaving(false);
        setShowToast(true);
      });
    }
  };

  const onFoodItemsChange = (type: string, newFoodItemsList: string[]) => {
    const newFoodItems = { ...foodItems };
    newFoodItems[type] = newFoodItemsList;
    setFoodItems(newFoodItems);
    updateFoodItems(newFoodItems);
  };

  const onClickDeleteFoodItem = (type: string, index: number) => {
    const newFoodItems = { ...foodItems };
    pullAt(newFoodItems[type], index);
    console.log('on click called', { newFoodItems, index });
    setFoodItems(newFoodItems);
    updateFoodItems(newFoodItems);
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

  // Handler.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(
      {
        username: e.target.email.value,
        password: e.target.password.value,
      },
      (isLoggedIn, userId) => {
        if (isLoggedIn) {
          setUserId(userId);
          alert('User logged in successfully');
          setShowLoginModal(false);
        } else {
          console.error('Invalid username or password');
        }
      },
    );
  };

  return (
    <div className="fcg">
      <Header />
      {/* Food Chart */}
      <div
        className="fcg-grid ag-theme-quartz" // applying the grid theme
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={chartData}
          domLayout="autoHeight"
          ref={gridRef}
          onGridReady={onGridReady}
        />
        <div className="fcg-buttons-container">
          <Button onClick={saveChart} className="fcg-button fcg-button--save">
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </Button>
          <button
            onClick={() => autoSizeAll(false)}
            className="fcg-button fcg-button--align"
          >
            <span>Auto-Size Columns</span>
          </button>
        </div>
      </div>

      {/* Food Items */}
      <button
        onClick={() => {
          setShowFoodItemsList(!showFoodItemsList);
        }}
        className="fcg-button food-items-btn"
      >
        <span>
          {!showFoodItemsList ? 'Show food items' : 'Hide food items'}
        </span>
      </button>

      {showFoodItemsList && (
        <div className="fcg-lists">
          <List
            header="Breakfast"
            listItems={foodItems?.breakfast}
            onChange={onFoodItemsChange}
            onDelete={onClickDeleteFoodItem}
            type="breakfast"
          ></List>
          <List
            header="Lunch"
            listItems={foodItems?.lunch}
            onChange={onFoodItemsChange}
            onDelete={onClickDeleteFoodItem}
            type="lunch"
          ></List>
          <List
            header="Dinner"
            listItems={foodItems?.dinner}
            onChange={onFoodItemsChange}
            onDelete={onClickDeleteFoodItem}
            type="dinner"
          ></List>
        </div>
      )}

      {/* Toast */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg="success"
          autohide
          delay={2000}
        >
          <Toast.Header>
            <strong className="me-auto">Food Chart Generator</strong>
          </Toast.Header>
          <Toast.Body>Chart Saved Successfully</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Login Modal */}
      <Modal show={showLoginModal} centered contentClassName="fcg-login-modal">
        <Modal.Header>Login</Modal.Header>
        <Modal.Body>
          <Form className="fcg-login-form" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
