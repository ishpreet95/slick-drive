import { FcOpenedFolder } from "react-icons/fc";
import { MdDownload as Down } from "react-icons/md";
import { FcFile } from "react-icons/fc";
import { MdOutlineDelete as Del } from "react-icons/md";
import { Link } from "react-router-dom";

export default function File(props) {
  const info = props.details;

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/file/delete/${info.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async () => {
    console.log("downloaded");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/file/download/${info.id}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const blob = await response.blob();
      const href = URL.createObjectURL(blob)
      const link = document.createElement('a');
      link.href = href;
      link.download = info.name;
      link.click();
    } catch (error) {
      console.error(`get: error occurred ${error}`);
    }
  };

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
              onClick={handleDownload}
              style={{
                color: "#167bff",
                fontSize: "2em",
                padding: "3px",
                margin: "0 5px",
              }}
            />
            <Del
              onClick={handleDelete}
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
