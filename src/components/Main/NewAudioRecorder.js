/*
This project makes use of react-voice-recorder (https://github.com/sivaprakashDesingu/react-voice-recorder)

MIT License

Copyright (c) 2020 Sivaprakash Desingu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import React, { Component } from "react";
// import microphone from '../../assets/imgs/recorder_imgs/microphone.png';
// import stopIcon from '../../assets/imgs/recorder_imgs/stop.png';
// import pauseIcons from '../../assets/imgs/recorder_imgs/pause.png';
// import playIcon from '../../assets/imgs/recorder_imgs/play-button.png';
// import closeIcons from '../../assets/imgs/recorder_imgs/close.png';
import styles from "../../recorder.module.css";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../audio-player-customization.css";
import { Form, Button } from "react-bootstrap";

const audioType = "audio/*";

class NewAudioRecorder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: {},
			seconds: 0,
			recording: false,
			recorded: false,
			mic_access_granted: false,
			medianotFound: false,
			audios: [],
			audio_title: "",
			audio_tags: [],
			audioBlob: null,
		};
		this.timer = 0;
		this.startTimer = this.startTimer.bind(this);
		this.countDown = this.countDown.bind(this);
	}

	handleAudioPause(e) {
		e.preventDefault();
		clearInterval(this.timer);
		this.mediaRecorder.pause();
		this.setState({ pauseRecord: true });
	}
	handleAudioStart(e) {
		e.preventDefault();
		this.startTimer();
		this.mediaRecorder.resume();
		this.setState({ pauseRecord: false });
	}

	startTimer() {
		//if (this.timer === 0 && this.state.seconds > 0) {
		this.timer = setInterval(this.countDown, 1000);
		//}
	}

	countDown() {
		// Remove one second, set state so a re-render happens.
		let seconds = this.state.seconds + 1;
		this.setState({
			time: this.secondsToTime(seconds),
			seconds: seconds,
		});
	}

	secondsToTime(secs) {
		let hours = Math.floor(secs / (60 * 60));

		let divisor_for_minutes = secs % (60 * 60);
		let minutes = Math.floor(divisor_for_minutes / 60);

		let divisor_for_seconds = divisor_for_minutes % 60;
		let seconds = Math.ceil(divisor_for_seconds);

		let obj = {
			h: hours,
			m: minutes,
			s: seconds,
		};
		return obj;
	}

	// notSupported ()

	async componentDidMount() {
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;
		if (navigator.mediaDevices) {
			const stream = await await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			// .then(() => this.setState({ mic_access_granted: true })).catch(notSupported())
			console.log(
				`The typeof stream ${
					typeof stream === "object" ? "is an object" : "is not an object"
				} on navigator.mediaDevice.getUserMedia`
			);
			if (typeof stream === "object") {
				this.setState({ mic_access_granted: true });
				console.log(`mic_access_granted is true`);
			}
			if (this.props.mimeTypeToUseWhenRecording) {
				this.mediaRecorder = new MediaRecorder(stream, {
					mimeType: this.props.mimeTypeToUseWhenRecording,
				});
			} else {
				this.mediaRecorder = new MediaRecorder(stream);
			}
			this.chunks = [];
			this.mediaRecorder.ondataavailable = (e) => {
				if (e.data && e.data.size > 0) {
					this.chunks.push(e.data);
				}
			};
		} else {
			this.setState({ medianotFound: true });
			this.setState({ mic_access_granted: false });
			console.log(
				"Media Decives will work only with SSL and if the user grants access to the device microphone..."
			);
		}
	}

	checkMicPermissionBeforeStart(e) {
		e.preventDefault();
		if (!this.state.mic_access_granted) {
			<p className={styles.help}>
				Some message
				{/* You need to grant access to your device microphone to be able to record audio.
        If you have blocked the access for this site, you can unblock it from your browser settings page.
                    
        On Chrome, you can go to chrome://settings/content/microphone */}
			</p>;
		} else {
			// wipe old data chunks
			this.chunks = [];
			// start recorder with 10ms buffer
			this.mediaRecorder.start(10);
			this.startTimer();
			// say that we're recording
			this.setState({ recording: true });
		}
	}

	// Commenting out startRecording to test it into checkMicPermissionBeforeStart()
	/* startRecording(e) {
  e.preventDefault();
  // wipe old data chunks
  this.chunks = [];
  // start recorder with 10ms buffer
  this.mediaRecorder.start(10);
  this.startTimer();
  // say that we're recording
  this.setState({ recording: true });
} */

	stopRecording(e) {
		clearInterval(this.timer);
		this.setState({ time: {} });
		e.preventDefault();
		// stop the recorder
		this.mediaRecorder.stop();
		// say that we're not recording
		this.setState({ recording: false, pauseRecord: false });
		// save the video to memory
		this.saveAudio();
		// say that the audio is recorded
		this.setState({ recorded: true });
	}

	handleReset(e) {
		if (this.state.recording) {
			this.stopRecording(e);
		}
		this.setState(
			{
				time: {},
				seconds: 0,
				recording: false,
				recorded: false,
				medianotFound: false,
				mic_access_granted: true,
				audios: [],
				audio_title: "",
				audio_tags: [],
				audioBlob: null,
			},
			() => {
				this.props.handleReset(this.state);
			}
		);
	}

	handleAudioUpload() {}

	saveAudio() {
		// convert saved chunks to blob
		const blob = new Blob(this.chunks, { type: audioType });
		// generate video url from blob
		const audioURL = window.URL.createObjectURL(blob);
		// append videoURL to list of saved videos for rendering
		const audios = [audioURL];
		this.setState({ audios, audioBlob: blob });
		this.props.handleAudioStop({
			url: audioURL,
			blob: blob,
			chunks: this.chunks,
			duration: this.state.time,
		});
	}

	saveAudioDetails(audioTitle, audioTags) {
		let a_title = "";
		let a_tags = [];

		this.setState(
			{
				audio_title: { a_title },
				audio_tags: { a_tags },
			},
			() => {}
		);
	}

	render() {
		const {
			recording,
			recorded,
			mic_access_granted,
			audios,
			time,
			medianotFound,
			pauseRecord,
			audio_title,
			audio_tags,
		} = this.state;
		const { showUIAudio, title, audioURL } = this.props;
		return (
			<div className={styles.recorder_library_box}>
				<div className={styles.recorder_box}>
					<div className={styles.recorder_box_inner}>
						{!this.props.hideHeader ? (
							<div className={styles.reco_header}>
								<h2 className={styles.h2}>{title}</h2>
								<span className={styles.close_icons}>
									{/* <img src={closeIcons} width={20} height={20} alt="Close icons" /> */}
								</span>
							</div>
						) : null}
						{!medianotFound ? (
							<div className={styles.record_section}>
								{/* Prev. Uplodad and Clear buttons */}

								<div className={styles.duration_section}>
									{/* Prev. Audio Preview */}

									{!recorded && mic_access_granted ? (
										<div className={styles.duration}>
											<span className={styles.mins}>
												{time.m !== undefined
													? `${time.m <= 9 ? "0" + time.m : time.m}`
													: "00"}
											</span>
											<span className={styles.divider}>:</span>
											<span className={styles.secs}>
												{time.s !== undefined
													? `${time.s <= 9 ? "0" + time.s : time.s}`
													: "00"}
											</span>
										</div>
									) : null}

									{!recording && !recorded && mic_access_granted ? (
										<p className={styles.help}>
											Press the microphone to record
										</p>
									) : recording &&
									  !recorded &&
									  mic_access_granted ? null : !recording &&
									  recorded &&
									  mic_access_granted ? null : !recording &&
									  !recorded &&
									  !mic_access_granted ? null : (
										<p className={styles.help}>
											You need to grant access to your device microphone to be
											able to record audio. If you have blocked the access for
											this site, you can unblock it from your browser settings
											page. On Chrome, you can go to
											chrome://settings/content/microphone
										</p>
									)}
								</div>

								{!recording && !recorded && mic_access_granted ? (
									<a
										// onClick={e => this.startRecording(e)}
										onClick={(e) => this.checkMicPermissionBeforeStart(e)}
										href=' #'
										className={styles.mic_icon}
									>
										{/* <img src={microphone} width={30} height={30} alt="Microphone icons" /> */}
										<span className={styles.microphone_icon_sec}>
											<svg
												className={styles.mic_icon_svg}
												version='1.1'
												xmlns='http://www.w3.org/2000/svg'
												x='0px'
												y='0px'
												viewBox='0 0 1000 1000'
												enableBackground='new 0 0 1000 1000'
											>
												<g>
													<path d='M500,683.8c84.6,0,153.1-68.6,153.1-153.1V163.1C653.1,78.6,584.6,10,500,10c-84.6,0-153.1,68.6-153.1,153.1v367.5C346.9,615.2,415.4,683.8,500,683.8z M714.4,438.8v91.9C714.4,649,618.4,745,500,745c-118.4,0-214.4-96-214.4-214.4v-91.9h-61.3v91.9c0,141.9,107.2,258.7,245,273.9v124.2H346.9V990h306.3v-61.3H530.6V804.5c137.8-15.2,245-132.1,245-273.9v-91.9H714.4z' />
												</g>
											</svg>
										</span>
									</a>
								) : !recorded && mic_access_granted ? (
									<div className={styles.record_controller}>
										<a
											onClick={(e) => this.stopRecording(e)}
											href=' #'
											className={`${styles.icons} ${styles.stop}`}
										>
											<span className={styles.stop_icon}></span>
											{/* <img src={stopIcon} width={20} height={20} alt="Stop icons" /> */}

											{/* <span className={`${styles.icons} ${styles.FaStop}`}></span> */}
										</a>
										<a
											onClick={
												!pauseRecord
													? (e) => this.handleAudioPause(e)
													: (e) => this.handleAudioStart(e)
											}
											href=' #'
											className={`${styles.icons} ${styles.pause}`}
										>
											{pauseRecord ? (
												<span className={styles.play_icons}></span>
											) : (
												<span className={styles.pause_icons}></span>
											)}
										</a>
									</div>
								) : null}
							</div>
						) : (
							<p style={{ color: "#fff", marginTop: 30, fontSize: 25 }}>
								Seems the site is Non-SSL
							</p>
						)}

						<h3>
							{" "}
							{audioURL !== null && showUIAudio ? "Audio preview" : null}
						</h3>
						{/* Audio Preview */}
						<div className={styles.audio_section}>
							{audioURL !== null && showUIAudio ? (
								//** Commenting out default audio element browser player **//
								// <audio controls>
								//     <source src={audios[0]} type="audio/ogg" />
								//     <source src={audios[0]} type="audio/mpeg" />
								// </audio>

								<AudioPlayer
									style={{ width: "300px" }}
									src={audios[0]}
									customAdditionalControls={[]}
									customVolumeControls={[]}
									showJumpControls={false}
									layout='stacked-reverse'
									customProgressBarSection={[
										// RHAP_UI.CURRENT_TIME,
										RHAP_UI.PROGRESS_BAR,
										// RHAP_UI.CURRENT_LEFT_TIME,
									]}
								/>
							) : null}
						</div>

						{/* Upload and Reset buttons */}
						<div className={styles.btn_wrapper}>
							{recorded ? (
								<Form>
									<Form.Group className='mb-3' controlId='audioTitle'>
										<Form.Label>Audio title</Form.Label>
										<Form.Control
											as='textarea'
											rows={2}
											placeholder='My Audio Title'
										/>
										<Form.Text className='text-muted'>
											Max. 140 characters.
										</Form.Text>
									</Form.Group>

									<Form.Group className='mb-3' controlId='audioTags'>
										<Form.Label>Tags</Form.Label>
										<Form.Control
											as='textarea'
											rows={3}
											placeholder='Separate tags by commas. E.g. fun, politics, etc.'
										/>
										<Form.Text className='text-muted'>
											Separte tags by commas.
										</Form.Text>
									</Form.Group>
									<Button
										onClick={() =>
											this.props.handleAudioUpload(this.state.audioBlob)
										}
										className={`${styles.btn} ${styles.upload_btn}`}
										disabled={this.props.uploadButtonDisabled}
									>
										Upload
									</Button>

									<Button
										onClick={(e) => this.handleReset(e)}
										className={`${styles.btn} ${styles.clear_btn}`}
									>
										Clear
									</Button>
								</Form>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NewAudioRecorder;

NewAudioRecorder.defaultProps = {
	hideHeader: true,
	mimeTypeToUseWhenRecording: null,
};
