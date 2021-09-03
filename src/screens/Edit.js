import React, { useRef, useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";
import { findAllStores } from "../Actions/storeAction";

const Edit = (props) => {
  const ref = useRef(null);

  const FindStores = useSelector((state) => state.findStoreReducer);
  const { data } = FindStores;
  const [file, selectFile] = useState(null);

  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState();

  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [result, setResult] = useState();

  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(findAllStores());
  }, [dispatch]);

  const handleSelectedStore = (selectedValues) => {
    localStorage.setItem("storeId", selectedValues);
    setSelectedValue(selectedValues);
  };
  const handlePreviewButton = () => {
    props.history.push("/preview");
  };

  const Stepdata = localStorage.getItem("step1");

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    localStorage.setItem("cropperImage", base64Image);
    setResult(base64Image);
    selectFile(null);
  }

  return (
    <div>
      <div>
        <div className="text-center">
          <text className="step_red_button">STEP 2</text>
        </div>
        <h1>UPLOAD YOUR DETAILS</h1>

        <br />

        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8 mb-5">
            <div
              ref={ref}
              className="img_container"
              style={{ position: "relative" }}
              id="capture"
            >
              <img className="w-100 blankImage  " alt="dfsf" src={Stepdata} />
              <div className="prev-cropper_img">
                <div className="col-md-5 text-center">
                  {file && (
                    <div
                      className="react-responsive-modal-root"
                      data-testid="root"
                    >
                      <button onClick></button>
                      <div
                        className="react-responsive-modal-overlay"
                        data-testid="overlay"
                        aria-hidden="true"
                        style={{
                          animation:
                            "300ms ease 0s 1 normal none running react-responsive-modal-overlay-in",
                        }}
                      ></div>
                      <div
                        className="react-responsive-modal-container react-responsive-modal-containerCenter"
                        data-testid="modal-container"
                      >
                        <div
                          className="react-responsive-modal-modal"
                          role="dialog"
                          aria-modal="true"
                          data-testid="modal"
                          tabindex="-1"
                          style={{
                            animation:
                              "300ms ease 0s 1 normal none running react-responsive-modal-modal-in",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div
                              className="ReactCrop ReactCrop--fixed-aspect"
                              tabindex="0"
                            >
                              <div>
                                <ReactCrop
                                  src={file}
                                  className="ReactCrop__image"
                                  onImageLoaded={setImage}
                                  crop={crop}
                                  onChange={(newCrop) => setCrop(newCrop)}
                                />
                              </div>
                            </div>
                            <div className="sc-fWWYYk fepHIR">
                              * Please adjust before you crop .
                            </div>

                            <button
                              onClick={getCroppedImg}
                              className="sc-gzcbmu fKwyEY"
                            >
                              Crop
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="main_cropperImage">
                  <label
                    for="imghaver"
                    className="cropperImage previewimg"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      top: "0",
                      marginTop: "auto",
                      marginBottom: "auto",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {result ? null : "Click to Upload Logo"}
                    <input
                      type="file"
                      id="imghaver"
                      accept="image/x-png,image/gif,image/jpeg"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    ></input>
                    {result && (
                      <img
                        style={{ position: "absolute" }}
                        className="previewimg_onload"
                        src={result}
                        alt="sdsf"
                      ></img>
                    )}
                  </label>
                </div>
                <div
                  className="d-flex jcc bod"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div className="m-1">
                    <select
                      onChange={(e) => handleSelectedStore(e.target.value)}
                      className="select_class "
                      name="selected"
                    >
                      <option value="0">---Select Store----</option>
                      {data &&
                        data.map((store) => (
                          <option value={store._id}>{store.store_name}</option>
                        ))}
                    </select>
                  </div>
                </div>{" "}
              </div>
            </div>

            {selectedValue && (
              <div className="container mt-2">
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-3 text-center bod">
                    <button
                      onClick={handlePreviewButton}
                      style={{ textAlign: "center" }}
                      className="sc-fIxmyt cnkbFD"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
