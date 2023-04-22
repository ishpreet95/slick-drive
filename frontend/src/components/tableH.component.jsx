import { BsFillArrowLeftSquareFill as Left } from "react-icons/bs";
export default function TableH() {
  return (
    <div className="file">
      <Left
        style={{
          fontSize: "2em",
          border: "1px solid #d4d4d4",
        }}
      />
      <div className="file-name table-h">Name</div>
      <div className="file-size table-h">Size</div>
      <div className="file-created table-h">Created On</div>
      <div className="file-actions table-h">Actions</div>
    </div>
  );
}
