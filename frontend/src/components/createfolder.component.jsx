import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function Example(props) {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (event) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/folder/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: folderName, parentFolder: props.parentfolder }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
    event.preventDefault();
    props.onHide();
  };

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="" controlId="formFolderName">
            <Form.Label>Folder Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter folder name" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
          </Form.Group>
          <Button className="mt-2" variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
