import { FcOpenedFolder } from "react-icons/fc";
import { MdDownload as Down } from "react-icons/md";
import { FcFile } from "react-icons/fc";
import { MdOutlineDelete as Del } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

export default function File(props) {
  const info = props.details;
  return (
    <tr>
      <td>
        {info.type == "folder" ? (
          <FcOpenedFolder
            style={{
              fontSize: "2em",
              padding: "3px",
            }}
          />
        ) : (
          <FcFile
            style={{
              fontSize: "2em",
              padding: "3px",
            }}
          />
        )}
      </td>
      {info.type == "folder" ? (
        <td>
          <Link to={`/table/${info.id}`}>{info.name}</Link>
        </td>
      ) : (
        <td>{info.name}</td>
      )}
      {info.type == "folder" ? <td>-</td> : <td>{info.size / 1000} KB</td>}
      <td>{new Date(info.createdAt).toLocaleString()}</td>
      <td>
        {info.type === "folder" ? (
          <span> - </span>
        ) : (
          <>
            <Down
              style={{
                color: "#167bff",
                fontSize: "2em",
                padding: "3px",
                margin: "0 5px",
              }}
            />
            <Del
              style={{
                color: "#167bff",
                fontSize: "2em",
                padding: "1px",
                margin: "0 5px",
              }}
            />
          </>
        )}
      </td>
    </tr>
  );
}
