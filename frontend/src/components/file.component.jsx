import { FcOpenedFolder } from "react-icons/fc";
import { MdDownload as Down } from "react-icons/md";
import { FcFile } from "react-icons/fc";
import { MdOutlineDelete as Del } from "react-icons/md";
export default function File(props) {
  const info = props.details;
  return (
    <div className="file">
      {/* to decide which icon to display depending on type */}
      {info.type == "folder" ? (
        <FcOpenedFolder
          style={{
            fontSize: "2em",
            border: "1px solid #d4d4d4",
            padding: "3px",
          }}
        />
      ) : (
        <FcFile
          style={{
            fontSize: "2em",
            border: "1px solid #d4d4d4",
            padding: "3px",
          }}
        />
      )}

      <div className="file-name">{info.name}</div>
      <div className="file-size">{info.size}</div>
      <div className="file-created">{info.created}</div>
      <div className="file-actions">
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
      </div>
    </div>
  );
}
