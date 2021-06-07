import React, { useState } from "react";

import PlayerComponent from "./PlayerComponent";

const Comment = ({ response }) => {
	const [comment, setComment] = useState(response);

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
			<p>
				<strong>{comment.responsePosterUserName}</strong>
				{" - "}
				<span className='text-muted'>{comment.responsePostDate}</span>
			</p>
			<PlayerComponent audioPath={comment.responseAudioPath} />
			<div className='d-flex justify-content-end thread__icon-container'>
				<button className={likeBtnClass} onClick={likeHandler}>
					{comment.responseLikes}
					<span className='visually-hidden'>likes. Like</span>
				</button>
			</div>
		</div>
	);
};

export default Comment;
