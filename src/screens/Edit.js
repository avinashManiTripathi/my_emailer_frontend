import React, { Component } from 'react';
import { findAllStores } from '../Actions/storeAction';

import ImageCrop from '../components/ImageCrop';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapstateToProps = (props) => {
	return {
		findStores: props.findStoreReducer,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		stores: () => dispatch(findAllStores()),
	};
};
class Edit extends Component {
	constructor(props, context) {
		super(props, context);
		this.props.stores();
		this.state = {
			userProfilePic: '',
			editor: null,
			scaleValue: 1,
			file: null,
		};
	}

	Stepdata = localStorage.getItem('step1');
	setEditorRef = (editor) => this.setState({ editor });

	onCrop = () => {
		const { editor } = this.state;
		if (editor !== null) {
			const url = editor.getImageScaledToCanvas().toDataURL();
			this.setState({ userProfilePic: url, selectedImage: null });
			localStorage.setItem('cropperImage', url);
		}
	};

	onCancel = () => {
		this.setState({
			selectedImage: null,
		});
	};

	onScaleChange = (scaleChangeEvent) => {
		const scaleValue = parseFloat(scaleChangeEvent.target.value);
		this.setState({ scaleValue });
	};

	DataURLtoFile = (dataurl, filename) => {
		let arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: mime });
	};

	profilePicChange = (fileChangeEvent) => {
		const file = fileChangeEvent.target.files[0];
		const { type } = file;
		if (
			!(
				type.endsWith('jpeg') ||
				type.endsWith('png') ||
				type.endsWith('jpg') ||
				type.endsWith('gif')
			)
		) {
		} else {
			this.setState({
				openCropper: true,
				selectedImage: fileChangeEvent.target.files[0],
				fileUploadErrors: [],
			});
		}
	};

	handleSelectedStore = (selectedValues) => {
		this.setState({
			selectedStore: selectedValues,
		});
		localStorage.setItem('storeId', selectedValues);
	};
	handlePreviewButton = () => {};

	render() {
		return (
			<>
				<div>
					<div>
						<div className="text-center">
							<text className="step_red_button">STEP 2</text>
						</div>
						<h1>UPLOAD YOUR DETAILS</h1>
						<br />
						<div className="container ">
							<div className="row">
								<div className="col-md-2"></div>
								<div className="col-md-8 mb-5">
									<div class="position-relative bg-secondary">
										<img
											src={this.Stepdata}
											alt="test"
											class="img-responsive img-hundo"
										/>

										<div className="col-md-5 text-center">
											{this.state.selectedImage && (
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
																'300ms ease 0s 1 normal none running react-responsive-modal-overlay-in',
														}}
													></div>
													<div
														className="react-responsive-modal-containers react-responsive-modal-containerCenter"
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
																	'300ms ease 0s 1 normal none running react-responsive-modal-modal-in',
															}}
														>
															<div
																style={{
																	display: 'flex',
																	flexDirection: 'column',
																	alignItems: 'center',
																}}
															>
																<h1 className=" mb-3">
																	Upload Your Company Logo
																</h1>

																<div
																	className="ReactCrop ReactCrop--fixed-aspect"
																	tabindex="0"
																>
																	<div>
																		<ImageCrop
																			imageSrc={this.state.selectedImage}
																			setEditorRef={this.setEditorRef}
																			onCrop={this.onCrop}
																			onCancel={this.onCancel}
																			scaleValue={this.state.scaleValue}
																			onScaleChange={this.onScaleChange}
																		/>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											)}
										</div>

										<div class="position-absolute caption">
											<label
												for="imghaver"
												className="cropperImage previewimg  "
												style={{
													position: 'absolute',
													bottom: '0',
													top: '0',
													marginTop: 'auto',
													marginBottom: 'auto',
													left: '50%',
													transform: 'translate(-50%, -50%)',
												}}
											>
												{this.state.userProfilePic ? null : (
													<span style={{ fontWeight: 'bold', margin: '10px' }}>
														Click to Upload Logo
													</span>
												)}
												<input
													type="file"
													id="imghaver"
													accept="image/x-png,image/gif,image/jpeg"
													style={{ display: 'none' }}
													onChange={this.profilePicChange}
												></input>
												{this.state.userProfilePic && (
													<img
														className=""
														style={{
															position: 'absolute',
															top: '3%',
															left: '0%',
															margin: '0px',
															width: '100%',
															height: '100%',
															padding: '0px',
														}}
														src={this.state.userProfilePic}
														alt="sdsf"
													></img>
												)}
											</label>
										</div>

										<div class="position-absolute select_caption">
											<select
												onChange={(e) =>
													this.handleSelectedStore(e.target.value)
												}
												className="select_field "
												name="selected"
											>
												<option value="0">---Select Store----</option>
												{this.props.findStores.data &&
													this.props.findStores.data.map((store) => (
														<option value={store._id}>
															{store.store_name}
														</option>
													))}
											</select>
										</div>
									</div>
									{this.state.selectedStore ? (
										<div className="container">
											<div className="row justify-content-center align-items-center">
												<div className="col-md-3 text-center bod">
													<Link to="/preview" className=" redirectLink">
														Preview
													</Link>
												</div>
											</div>
										</div>
									) : null}
								</div>
								<div className="col-md-2"></div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default connect(mapstateToProps, mapDispatchToProps)(Edit);
