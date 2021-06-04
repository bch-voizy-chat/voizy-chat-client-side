import React, { Component } from "react";
import styles from "../../recorder.module.css";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../audio-player-customization.css";
import { Form, Button } from "react-bootstrap";

const audioType = "audio/*";

class NewAudioRecorder extends Component {
	render() {
		const { recorderState, checkMicPermissionBeforeStart } = this.props;

		const {
			time,
			seconds,
			record,
			recording,
			recorded,
			mic_access_granted,
			medianotFound,
			pauseRecord,
			audios,
			audio_title,
			audio_tags,
			audioBlob,
			mimeTypeToUseWhenRecording,
			recordedChunks,
		} = recorderState;
		const { showUIAudio, title, audioURL } = this.props;

		return (
			<>
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
								<p className={styles.help}>Press the microphone to record</p>
							) : recording &&
							  !recorded &&
							  mic_access_granted ? null : !recording &&
							  recorded &&
							  mic_access_granted ? null : !recording &&
							  !recorded &&
							  !mic_access_granted ? null : (
								<p className={styles.help}>
									You need to grant access to your device microphone to be able
									to record audio. If you have blocked the access for this site,
									you can unblock it from your browser settings page. On Chrome,
									you can go to chrome://settings/content/microphone
								</p>
							)}
						</div>

						{!recording && !recorded && mic_access_granted ? (
							<a
								// onClick={e => this.startRecording(e)}
								onClick={(e) => checkMicPermissionBeforeStart(e)}
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
			</>
		);
	}
}

export default NewAudioRecorder;
