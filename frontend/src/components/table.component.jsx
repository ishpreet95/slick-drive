import File from "./file.component";
import TableH from "./tableH.component";
import { AiFillFileAdd as Fil } from "react-icons/ai";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import { AiFillFolderAdd as Fold } from "react-icons/ai";

import Dropdown from "react-bootstrap/Dropdown";
export default function Table() {
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
    <div className="file-table">
      <TableH />
      {filesList}
      <Dropdown>
        <Dropdown.Toggle className="upload-btn" variant="primary">
          <Plus />
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
    </div>
  );
}
