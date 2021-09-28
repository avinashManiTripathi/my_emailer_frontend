import React from "react";

function Model(props) {
  alert("props ", props.onClick);
  return (
    <div>
      {/* <a href="#myModal" class="trigger-btn" data-toggle="modal">
        Click to Open Confirm Modal
      </a> */}

      <div
        id="myModal"
        className={`modal fade  ${props.status ? "show " : ""}`}
        style={{
          display: `${props.status ? "block" : "none"}`,
          position: "fixed",
        }}

        // className="modal fade"
      >
        <div class="modal-dialog delete_modal-confirm">
          <div class="modal-content">
            <div class="modal-header flex-column">
              <div class="icon-box">
                <i class="material-icons"> &times;</i>
              </div>
              <h4 class="modal-title w-100">Are you sure?</h4>
            </div>
            <div class="modal-body">
              <p>
                Do you really want to delete these records? This process cannot
                be undone.
              </p>
            </div>
            <div class="modal-footer justify-content-center">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={props.onClick}
                type="button"
                class="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model;
