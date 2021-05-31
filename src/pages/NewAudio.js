import React from "react";

import NewAudioRecorder from "../components/Main/NewAudioRecorder";
import NewAudioPlayback from "../components/Main/NewAudioPlayback";

const NewAudio = (props) => {
	const isComment = props.location.state.status;
	let threadId;
	if (isComment) {
		/** If the new audio is a comment, a threadId is associated to it */
		threadId = props.location.state.threadId;
	}

	return (
		<div>
			{isComment ? "Comment for thread " + threadId : "New thread"}
			<NewAudioRecorder />
			<NewAudioPlayback />
		</div>
	);
};

export default NewAudio;
