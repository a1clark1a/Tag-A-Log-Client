import React from "react";

import "./DeleteModal.css";

const DeleteModal = ({ handleCancel, handleConfirm, show, children }) => {
  const showHideClassName = show ? " show " : "hide";

  return (
    <div className={`modal-wrapper ${showHideClassName}`}>
      <section className="modal-main">
        {children}
        <div className="btn-grp">
          <button className="button" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};

export default DeleteModal;
