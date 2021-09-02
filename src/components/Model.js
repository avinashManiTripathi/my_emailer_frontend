import React from "react";

function Model(props) {
  return (
    <div className="modals">
      <div className="modal-content">
        <span className="close">&times;</span>
        {props.children}
      </div>
    </div>
  );
}

export default Model;
