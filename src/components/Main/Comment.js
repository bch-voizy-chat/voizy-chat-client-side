import React from "react";

import AudioPlayer from "./AudioPlayer";

const Comment = ({ comment }) => {
	return (
		<div className='comment'>
			<p>Comment {comment}</p>
			<AudioPlayer />
		</div>
	);
};

export default Comment;
