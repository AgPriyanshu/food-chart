import { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export const LoginModal = ({ show, onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const onClickHandler = () => {
    formRef?.current?.requestSubmit();
  };

  return (
    <Modal
      className="fcg-login-modal"
      dialogClassName="fcg-login-modal__dialog"
      contentClassName="fcg-login-modal__content"
      show={show}
      centered
    >
      <Modal.Header className="fcg-login-modal__header">
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body className="fcg-login-modal__body">
        <Form
          ref={formRef}
          onSubmit={onSubmit}
          className="fcg-login-modal__form"
        >
          <Form.Group>
            <Form.Label htmlFor="username">Email</Form.Label>
            <Form.Control
              className="fcg-login-modal__input fcg-login-modal__input--email"
              type="email"
              id="email"
              aria-describedby="passwordHelpBlock"
              placeholder="Please enter your email address"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              className="fcg-login-modal__input fcg-login-modal__input--password"
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Please enter your password"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="fcg-login-modal__footer">
        <Button variant="primary" onClick={onClickHandler}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
