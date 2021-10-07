/*
This project makes use of react-voice-recorder (https://github.com/sivaprakashDesingu/react-voice-recorder)

MIT License

Copyright (c) 2020 Sivaprakash Desingu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import React, { Component } from "react";
import NewAudioRecorder from "../Main/NewAudioRecorder";
import NewAudioPlayback from "../Main/NewAudioPlayback";

import styles from "../../recorder.module.css";

const audioType = "audio/*";

class Recorder extends Component {
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
			audioBlob: null,
			mimeTypeToUseWhenRecording: `audio/webm`,
			recordedChunks: null,
			pauseRecord: false,
		};
		this.timer = 0;
		this.startTimer = this.startTimer.bind(this);
		this.counter = this.counter.bind(this);
		this.checkMicPermissionBeforeStart =
			this.checkMicPermissionBeforeStart.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
		this.handleAudioPause = this.handleAudioPause.bind(this);
		this.handleAudioStart = this.handleAudioStart.bind(this);
		this.handleAudioUpload = this.handleAudioUpload.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleAudioPause() {
		clearInterval(this.timer);
		this.mediaRecorder.pause();
		this.setState({ pauseRecord: true });
	}
	handleAudioStart() {
		this.startTimer();
		this.mediaRecorder.resume();
		this.setState({ pauseRecord: false });
	}

	startTimer() {
		this.timer = setInterval(this.counter, 1000);
	}

	counter() {
		// Add one second, set state so a re-render happens.
		let seconds = this.state.seconds + 1;
		if (seconds > 30) this.stopRecording();
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

	checkMicPermissionBeforeStart() {
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;
		if (navigator.mediaDevices) {
			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then((stream) => {
					this.setState({ localStream: stream });
					if (typeof stream === "object") {
						this.setState({ mic_access_granted: true });
					}
					if (this.state.mimeTypeToUseWhenRecording) {
						this.mediaRecorder = new MediaRecorder(stream, {
							mimeType: this.state.mimeTypeToUseWhenRecording,
						});
					} else {
						this.mediaRecorder = new MediaRecorder(stream);
					}
					this.setState({ recordedChunks: [] });
					this.mediaRecorder.ondataavailable = (e) => {
						if (e.data && e.data.size > 0) {
							this.state.recordedChunks.push(e.data);
						}
					};
					// wipe old data chunks
					this.setState({ recordedChunks: [] });
					// start recorder with 10ms buffer
					this.mediaRecorder.start(0);
					this.startTimer();
					// say that we're recording
					this.setState({ recording: true });
				})
				.catch(() => {
					alert(
						"You need to grant access to your device microphone to be able to record audio. If you have blocked the access for this site, you can unblock it from your browser settings page. On Chrome, you cango to chrome://settings/content/microphone"
					);
				});
		} else {
			this.setState({ medianotFound: true });
			this.setState({ mic_access_granted: false });
		}
	}

	stopRecording() {
		clearInterval(this.timer);
		this.setState({ time: {} });
		this.state.localStream.getTracks().forEach((track) => {
			track.stop();
		});
		this.setState({ localStream: null });
		// stop the recorder
		this.mediaRecorder.stop();
		// say that we're not recording
		this.setState({ recording: false, pauseRecord: false });
		// save the video to memory
		this.saveAudio();
		// say that the audio is recorded
		this.setState({ recorded: true });
	}

	saveAudio() {
		// convert saved chunks to blob
		const blob = new Blob(this.state.recordedChunks, { type: audioType });
		// generate video url from blob
		const audioURL = window.URL.createObjectURL(blob);
		// append videoURL to list of saved videos for rendering
		const audios = [audioURL];
		this.setState({ audios, audioBlob: blob });
		this.props.handleAudioStop({
			url: audioURL,
			blob: blob,
			chunks: this.state.recordedChunks,
			duration: this.state.time,
		});
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

	handleAudioUpload() {
		this.props.handleAudioUpload(this.state);
	}

	render() {
		return (
			<div className={styles.recorder_library_box}>
				<div className={styles.recorder_box_inner}>
					{!this.state.recorded ? (
						<NewAudioRecorder
							recorderState={this.state}
							checkMicPermissionBeforeStart={this.checkMicPermissionBeforeStart}
							stopRecording={this.stopRecording}
							handleAudioStart={this.handleAudioStart}
							handleAudioPause={this.handleAudioPause}
						/>
					) : (
						<NewAudioPlayback
							audioURL={this.props.audioDetails.url}
							showUIAudio
							audios={this.state.audios}
							handleReset={this.handleReset}
							handleAudioUpload={this.handleAudioUpload}
							setAudioTags={this.props.setAudioTags}
							setAudioTitle={this.props.setAudioTitle}
							isComment={this.props.isComment}
							isLoading={this.props.isLoading}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default Recorder;
