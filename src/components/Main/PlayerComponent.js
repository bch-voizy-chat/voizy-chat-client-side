import React from "react";

import AudioPlayer,  { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import demoAudio from "../../audio/Yksi_pieni_elefanti_intro.mp3";
import { Container, Row, Col } from 'react-bootstrap';
// remember to keep the custom.css file at the bottom for overriding the styles accordingly.
import '../../audio-player-customization.css';

const PlayerComponent = () => {
	return <div className="player-component-container">
		{/* <div className="audio__title">
			<h2>Audio Title</h2>
		</div> */}
			<AudioPlayer
				src={demoAudio}
				customAdditionalControls={[]}
				customVolumeControls={[]}
				showJumpControls={false}
				layout="horizontal-reverse"
				customProgressBarSection={
					[
					  RHAP_UI.CURRENT_TIME,
					  RHAP_UI.PROGRESS_BAR,
					  RHAP_UI.CURRENT_LEFT_TIME,
					]
				}

			/>




	</div>;
};

export default PlayerComponent;
