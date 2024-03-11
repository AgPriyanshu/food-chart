import { Button, Form, Modal } from 'react-bootstrap';

export const LoginModal = ({ show, onSubmit }) => {
  return (
    <Modal show={show} centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header>
          <Modal.Title>Login Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <Form.Group className="d-flex align-items-center mb-3 gap-3">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              id="username"
              aria-describedby="passwordHelpBlock"
            />
          </Form.Group>
          <Form.Group className="d-flex align-items-center mb-3 gap-3">
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
