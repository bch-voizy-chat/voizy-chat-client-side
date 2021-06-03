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
			<PlayerComponent audioPath={comment.responseAudioPath} />
			<p className='d-flex justify-content-end'>
				<strong>{comment.responseCreator.userName}</strong>.{" "}
				{comment.responseDate}
			</p>
			<div className='d-flex justify-content-end thread__icon-container'>
				<button className={likeBtnClass} onClick={likeHandler}>
					{comment.responseLike}
					<span className='visually-hidden'>likes. Like</span>
				</button>
			</div>
		</div>
	);
};

export default Comment;
