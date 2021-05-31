import React, { useState } from "react";

import PlayerComponent from "./PlayerComponent";

const Comment = ({ response }) => {
	const [comment, setComment] = useState(response);

	const formatDate = (date) => {
		let d = new Date(date);
		let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
		let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
		let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
		let hr = d.getHours();
		let min = d.getMinutes();
		return `${da}/${mo}/${ye}, ${hr}:${min}`;
	};

	const [like, setLike] = useState(false);
	const likeHandler = () => {
		if (like) {
			setLike(false);
			setLikeCount(likeCount - 1);
			/** Post update: likeCount + if user liked the post. */
		} else {
			setLike(true);
			setLikeCount(likeCount + 1);
			/** Post update */
		}
	};

	let likeBtnClass = `d-flex align-items-center btn-text squishy thread__icon thread__icon--like ${
		like && "liked"
	}`;

	return (
		<div className='comment audio-container'>
			<p>
				<strong>{comment.responsePosterUserName}</strong>
				{" - "}
				<span className='text-muted'>
					{formatDate(comment.responsePostDate)}
				</span>
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
