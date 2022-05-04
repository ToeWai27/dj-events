import { useState } from "react";
import { API_URL } from "../config/index";
import styles from "@/styles/From.module.css";
import fetch from "isomorphic-unfetch";
export default function ImageUpload({ evtId, imageUploaded, field }) {
  const [image, setimage] = useState(null);
  console.log(evtId);
  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files.image", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    console.log(formData);
    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      imageUploaded();
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange}></input>
        </div>
        <input type="submit" value="Upload" className="btn"></input>
      </form>
    </div>
  );
}
