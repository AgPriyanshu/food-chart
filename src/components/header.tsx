import { Button } from 'react-bootstrap';
import { deleteUserId } from '../constants';

export const Header = () => {
  return (
    <div className="fcg-header">
      <h1 className="fcg-header__text">Food Chart Generator</h1>;
      <Button
        className="fcg-header__logout-btn"
        onClick={() => {
          deleteUserId();
        }}
      >
        Log Out
      </Button>
    </div>
  );
};
