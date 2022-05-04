import styles from "@/styles/Modal.module.css";

import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import ReactDom from "react-dom";
export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setisBrowser] = useState(false);
  useEffect(() => setisBrowser(true));
  const handelClose = (e) => {
    e.preventDefault();
    onClose();
  };
  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handelClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;
  if (isBrowser) {
    return ReactDom.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
