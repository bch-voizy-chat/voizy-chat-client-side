import React, { useState } from "react";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "../../recorder.module.css";
import { Form, Button } from "react-bootstrap";
// remember to keep the custom.css file at the bottom for overriding the styles accordingly.
import "../../audio-player-customization.css";

import InputTags from "./InputTags";

const NewAudioPlayback = ({ audios, handleReset, handleAudioUpload }) => {
	const [tags, setTags] = useState([]);

	return (
		<div className={styles.audio_section}>
			<h3>Audio preview</h3>
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
			<Form id='newAudioForm'>
				<Form.Group className='mb-3' controlId='audioTitle'>
					<Form.Label>Audio title</Form.Label>
					<Form.Control type='text' placeholder='My Audio Title' />
					<Form.Text className='text-muted'>Max. 140 characters.</Form.Text>
				</Form.Group>

				<InputTags tags={tags} setTags={setTags} />

				<input
					type='hidden'
					name='hiddenvalue'
					id='hiddenvalue'
					value='someHiddenValue'
				></input>

				<Button
					onClick={handleAudioUpload}
					className={`${styles.btn} ${styles.upload_btn}`}
					// disabled={this.props.uploadButtonDisabled}
				>
					Upload
				</Button>

				<Button
					onClick={handleReset}
					className={`${styles.btn} ${styles.clear_btn}`}
				>
					Clear
				</Button>
			</Form>
		</div>
	);
};

export default NewAudioPlayback;
