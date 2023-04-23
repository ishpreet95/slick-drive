import File from "./file.component";
import React, { useEffect, useState } from "react";
import { AiFillFileAdd as Fil } from "react-icons/ai";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import { AiFillFolderAdd as Fold } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import { FaAngleDoubleLeft as Left } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams } from "react-router-dom";
export default function Altable(props) {
  let { id } = useParams();
  if (id === undefined) id = "";
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
  return (
    <Table striped bordered hover className="file-table">
      <thead>
        <tr>
          <th>
            <Left
              style={{
                fontSize: "1.5em",
              }}
            />
          </th>
          <th>Name</th>
          <th>Size</th>
          <th>Created On</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{filesList}</tbody>
      <Dropdown>
        <Dropdown.Toggle className="upload-btn" variant="primary">
          <Plus
            style={{
              fontSize: "1.2em",
              padding: "3px",
            }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">
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
          <Dropdown.Item href="#/action-2">
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
    </Table>
  );
}
