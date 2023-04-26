import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function Example(props) {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onHide();
  };

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="" controlId="formFolderName">
            <Form.Label>Folder Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-2" variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
