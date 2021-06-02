import React from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import demoAudio from "../../audio/Yksi_pieni_elefanti_intro.mp3";
import { Container, Row, Col } from "react-bootstrap";
// remember to keep the custom.css file at the bottom for overriding the styles accordingly.
import "../../audio-player-customization.css";

const NewAudioPlayback = () => {
	return (
		<div>
			Audio Playback
			<Container>
				<Row>
					<Col lg={4}>
						<AudioPlayer
							autoPlay
							src={demoAudio}
							customAdditionalControls={[]}
							customVolumeControls={[]}
							showJumpControls={false}
							layout='horizontal-reverse'
							// customProgressBarSection={
							//   [
							//     RHAP_UI.CURRENT_TIME,
							//     RHAP_UI.PROGRESS_BAR,
							//     RHAP_UI.CURRENT_LEFT_TIME,
							//   ]
							// }
							// onPlay={e => console.log("onPlay")}
							// other props here
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default NewAudioPlayback;
