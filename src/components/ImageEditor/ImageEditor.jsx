import React, { useState } from "react";

import styles from "./ImageEditor.module.scss";

function ImageEditor({ setImage, img, setImg }) {
  //const [img, setImg] = useState("");
  function imageHandler(e) {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  return (
    <div className={styles["image-editor"]}>
      <img
        className={styles["image-editor__img"]}
        src={img}
        id="show-img"
        alt=""
      />
      <label className={styles["image-editor__label"]} htmlFor="img-edit-file">
        Browse
      </label>
      <input type="file" id="img-edit-file" onChange={imageHandler} />
    </div>
  );
};

export default ImageEditor;
