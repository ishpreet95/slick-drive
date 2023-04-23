import { FcOpenedFolder } from "react-icons/fc";
import { MdDownload as Down } from "react-icons/md";
import { FcFile } from "react-icons/fc";
import { MdOutlineDelete as Del } from "react-icons/md";
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
      <td>{info.name}</td>
      <td>{info.size}</td>
      <td>{info.created}</td>
      <td>
        {info.actions[0] == "Download" ? (
          <Down
            style={{
              color: "#167bff",
              fontSize: "2em",
              padding: "3px",
              margin: "0 5px",
            }}
          />
        ) : (
          <span></span>
        )}
        {info.actions[1] == "Delete" ? (
          <Del
            style={{
              color: "#167bff",
              fontSize: "2em",
              padding: "1px",
              margin: "0 5px",
            }}
          />
        ) : (
          <span></span>
        )}
      </td>
    </tr>
  );
}
