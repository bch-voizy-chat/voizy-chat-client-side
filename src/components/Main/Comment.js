import React, { useState } from "react";

import AudioPlayer from "./AudioPlayer";

const Comment = ({ comment }) => {
	const [like, setLike] = useState(false);
	const likeHandler = () => {
		console.log("like!");
		like ? setLike(false) : setLike(true);
	};

	let likeBtnClass = `d-flex align-items-center btn-text squishy thread__icon thread__icon--like ${
		like && "liked"
	}`;

	return (
		<div className='comment audio-container'>
			<h4>Comment {comment}</h4>
			<AudioPlayer />
			<div className='d-flex justify-content-end thread__icon-container'>
				<button className={likeBtnClass} onClick={likeHandler}>
					96<span className='visually-hidden'>likes. Like</span>
				</button>
			</div>
		</div>
	);
};

export default Comment;
