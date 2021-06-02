import React from "react";

import Recorder from "../components/Main/Recorder";
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
			<Recorder />
		</div>
	);
};

export default NewAudio;
