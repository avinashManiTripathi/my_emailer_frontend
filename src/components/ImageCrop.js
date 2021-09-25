import React from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";

const ImageCrop = ({
  imageSrc,
  onCrop,
  onCancel,
  setEditorRef,
  scaleValue,
  onScaleChange,
}) => (
  <div>
    <div className="editorOverlayInner">
      <div className="editorModalContent clearfix">
        <div className="cropCnt">
          <AvatarEditor
            image={imageSrc}
            border={50}
            scale={scaleValue}
            rotate={0}
            ref={setEditorRef}
            height={80}
            width={160}
          />
          <div className="d-flex  mt-3">
            <span className="inc-dec-button">-</span>
            <input
              style={{ width: "100%" }}
              type="range"
              value={scaleValue}
              name="points"
              min="1"
              max="10"
              onChange={onScaleChange}
              className="mt-2"
            />
            <span className="inc-dec-button">+</span>
          </div>

          <div className="d-flex mt-5 justify-content-end">
            <button onClick={onCancel} className="btn btn-outline">
              Cancel
            </button>
            <button onClick={onCrop} className="btn btn-danger ">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ImageCrop.propTypes = {
  open: PropTypes.bool.isRequired,
  setEditorRef: PropTypes.func.isRequired,
  onCrop: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  scaleValue: PropTypes.number.isRequired,
  onScaleChange: PropTypes.func.isRequired,
};

export default ImageCrop;
