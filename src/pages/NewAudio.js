import React from "react";

import NewAudioRecorder from "../components/Main/NewAudioRecorder";
import NewAudioPlayback from "../components/Main/NewAudioPlayback";

const NewAudio = () => {
	return (
		<div>
			New Audio
			<NewAudioRecorder />
			<NewAudioPlayback />
		</div>
	);
};

export default NewAudio;
