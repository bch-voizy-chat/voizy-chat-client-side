/*
This project makes use of React H5 audio player (https://github.com/lhz516/react-h5-audio-player)

MIT License
Copyright (c) 2019 Hanz Luo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import React from "react";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const PlayerComponent = ({ audioPath }) => {
	return (
		<div className='player-component-container'>
			<AudioPlayer
				src={audioPath}
				autoPlayAfterSrcChange={false}
				timeFormat={"mm:ss"}
				customAdditionalControls={[]}
				customVolumeControls={[]}
				showJumpControls={false}
				layout='horizontal-reverse'
				preload = 'auto' // Testing 'metadata' compared to 'auto'
				defaultDuration = '00:30' // This can be used if metadata (lenght) is not loaded correctly.
				customProgressBarSection={[
					RHAP_UI.DURATION,
					<div>/</div>,
					RHAP_UI.CURRENT_TIME,
					RHAP_UI.PROGRESS_BAR,
					// RHAP_UI.CURRENT_LEFT_TIME,
				]}
			/>
		</div>
	);
};

export default PlayerComponent;
