import File from "./file.component";
import React, { useEffect, useState, useRef } from "react";
import { AiFillFileAdd as Fil } from "react-icons/ai";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import { AiFillFolderAdd as Fold } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import { FaAngleDoubleLeft as Left } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams, useNavigate } from "react-router-dom";
import Createfolder from "./createfolder.component";

export default function Altable(props) {
  let { id } = useParams();
  if (id === undefined || id === null || id === "null") id = "";
  const [details, setDetails] = useState([]);
  const getDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/folder/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getData = async () => {
      let data = await getDetails();
      // console.log(data);
      data = [
        ...data.folders.map((d) => {
          return { ...d, type: "folder" };
        }),
        ...data?.files,
      ];
      setDetails(data);
    };
    getData();
  }, [id]);

  const filesList = details.map((detail) => <File details={detail} />);

  const inputRef = useRef(null);

  const handleDisplayFileDetails = () => {
    if (inputRef.current?.files) {
      const file = inputRef.current.files[0];
      const formData = new FormData();
      formData.append("files", file);
      formData.append("parentFolder", id);
      formData.append("filename", file.name);
      const token = localStorage.getItem("token");
      fetch(`http://localhost:3000/file/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (e) => {
    inputRef.current?.click();
    console.log("clicked");
  };

  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

  const handleCreateFolderClick = () => {
    setShowCreateFolderModal(true);
  };

  const handleCloseCreateFolderModal = () => {
    setShowCreateFolderModal(false);
  };

  const navigate = useNavigate();

  const handleFolderDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/folder/delete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return navigate(`/table/${data.parentFolder}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBackButtonClick = () => {
    if (id === "") return;
    navigate(-1)
  };

  return (
    <Table striped bordered hover className="file-table">
      <thead>
        <tr>
          <th>
            {/* <Link to={`/table/${backFolder}`}> */}
              <Left onClick={handleBackButtonClick}
                style={{
                  fontSize: "1.5em",
                }}
              />
            {/* </Link> */}
          </th>
          <th>Name</th>
          <th>Size</th>
          <th>Created On</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{filesList}</tbody>
      {filesList.length === 0 && id !== "" ? (
        <thead as="button" onClick={handleFolderDelete}>
          Empty Folder - Delete?
        </thead>
      ) : (
        ""
      )}
      <Dropdown>
        <Dropdown.Toggle className="upload-btn rotate" variant="primary">
          <Plus
            style={{
              fontSize: "1.2em",
              padding: "3px",
            }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <input ref={inputRef} onChange={handleDisplayFileDetails} className="d-none" type="file" />
          <Dropdown.Item as="button" onClick={handleSubmit}>
            <Fil
              style={{
                color: "#167bff",
                fontSize: "2em",
                padding: "3px",
                margin: "0 5px",
              }}
            />
            Add File
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={handleCreateFolderClick}>
            <Fold
              style={{
                color: "#167bff",
                fontSize: "2em",
                padding: "3px",
                margin: "0 5px",
              }}
            />
            Add Folder
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Createfolder show={showCreateFolderModal} onHide={handleCloseCreateFolderModal} parentfolder={id} />
    </Table>
  );
}
