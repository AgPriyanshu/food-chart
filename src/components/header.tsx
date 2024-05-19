import { Button } from 'react-bootstrap';
import { deleteUserId } from '../constants';

export const Header = () => {
  return (
    <>
      <h1 className="fcg-header">Food Chart Generator</h1>;
      <Button
        className="w-25"
        onClick={() => {
          deleteUserId();
        }}
      >
        Log Out
      </Button>
    </>
  );
};
