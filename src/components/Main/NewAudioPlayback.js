import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// remember to keep the custom.css file at the bottom for overriding the styles accordingly.
import "../../audio-player-customization.css";

const NewAudioPlayback = ({
	audios,
	handleReset,
	handleAudioUpload,
	setAudioTitle,
	setAudioTags,
}) => {
	const [tags, setTags] = useState([]);
	const [error, setError] = useState("");

	const removeTag = (i) => {
		console.log(i);
		const newTags = [...tags];
		newTags.splice(i, 1);
		setTags(newTags);
		setAudioTags(newTags);
	};

	const keyDownHandler = (e) => {
		setError("");
		const val = e.target.value;
		if (e.keyCode == 13) {
			// Check if tag already exists
			if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
				setError("Tag exists already");
				return;
			}
			// Add tag if value is not empty
			if (val) {
				setTags([...tags, val]);
				setAudioTags([...tags, val]);
			}
			e.target.value = null;
		}
	};

	let tagList = tags.map((tag, index) => {
		return (
			<li key={index} className='d-flex align-items-center input-tag__tag'>
				{tag}
				<button
					type='button'
					onClick={() => removeTag(index)}
					className='input-tag__remove-btn'
				>
					<span className='visually-hidden'>Remove tag</span>
					<span aria-hidden className='input-tag__remove-btn__text'>
						+
					</span>
				</button>
			</li>
		);
	});

	const handleTitleInput = (e) => {
		setAudioTitle(e.target.value);
	};

	const handleSubmit = () => {
		handleAudioUpload();
	};

	return (
		<div>
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
					<Form.Control
						type='text'
						placeholder='My Audio Title'
						onChange={handleTitleInput}
					/>
					<Form.Text className='text-muted'>Max. 140 characters.</Form.Text>
				</Form.Group>

				<Form.Group controlId='audioTags'>
					<Form.Label>Enter tags</Form.Label>

					<Form.Control
						type='text'
						onKeyDown={keyDownHandler}
						className='input-tag__tags__input'
					/>
					<Form.Text className='text-muted'>
						{error ? (
							<span className='text-danger'>{error}</span>
						) : (
							"Press ENTER to add tag"
						)}
					</Form.Text>
					<ul className='d-flex align-items-center flex-wrap input-tag__tags'>
						{tagList}
					</ul>
				</Form.Group>

				<input
					type='hidden'
					name='hiddenvalue'
					id='hiddenvalue'
					value='someHiddenValue'
				></input>

				<Button
					onClick={handleSubmit}
					className={``}
					// disabled={this.props.uploadButtonDisabled}
				>
					Upload
				</Button>

				<Button onClick={handleReset} className={``}>
					Clear
				</Button>
			</Form>
		</div>
	);
};

export default NewAudioPlayback;
