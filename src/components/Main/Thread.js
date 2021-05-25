import React from "react";

import AudioPlayer from "./AudioPlayer";

const Thread = ({ thread }) => {
	return (
		<div className='thread'>
			<h2 className='audio__title'>Audio Title {thread}</h2>
			<AudioPlayer />
			<div className='d-flex justify-content-around'>
				<p>comment</p>
				<p>share</p>
				<p>like</p>
			</div>
		</div>
	);
};

export default Thread;
