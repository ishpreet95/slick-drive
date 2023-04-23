import File from "./file.component";
import { AiFillFileAdd as Fil } from "react-icons/ai";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import { AiFillFolderAdd as Fold } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import { BsFillArrowLeftSquareFill as Left } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
export default function Altable() {
  const details = [
    {
      type: "folder",
      name: "one",
      size: "1 MB",
      created: "Today",
      actions: ["Download", "Delete"],
    },
    {
      type: "folder",
      name: "two",
      size: "2 MB",
      created: "Yesterday",
      actions: ["Download", "Delete"],
    },
    {
      type: "folder",
      name: "three",
      size: "3 MB",
      created: "15/04/2023",
      actions: ["Download", "Delete"],
    },
    {
      type: "file",
      name: "four",
      size: "4 MB",
      created: "14/04/2023",
      actions: ["Download", "Delete"],
    },
  ];
  const filesList = details.map((detail) => <File details={detail} />);
  return (
    <Table striped bordered hover className="file-table">
      <thead>
        <tr>
          <th>
            <Left
              style={{
                fontSize: "2em",
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
