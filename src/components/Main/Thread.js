import React, { useState } from "react";

import AudioPlayer from "./AudioPlayer";
import { Link } from "react-router-dom";

const Thread = ({ thread }) => {
	const [like, setLike] = useState(false);

	const likeHandler = () => {
		console.log("like!");
		like ? setLike(false) : setLike(true);
	};

	let likeBtnClass = `btn-text squishy thread-icon thread-icon--like ${
		like && "liked"
	}`;

	const shareHandler = () => console.log("share!");
	return (
		<article className='thread'>
			<h2 className='audio__title'>Audio {thread}</h2>
			<AudioPlayer />
			<div className='d-flex justify-content-between'>
				<Link
					className='d-flex justify-content-center align-items-center comment-link thread-icon thread-icon--comment squishy'
					to={`/conversation/${thread}`}
				>
					22<span className='visually-hidden'>comments. Comment</span>
				</Link>
				<button
					className='btn-text squishy thread-icon thread-icon--share'
					onClick={shareHandler}
				>
					<span className='visually-hidden'>Share</span>
				</button>
				<button className={likeBtnClass} onClick={likeHandler}>
					96<span className='visually-hidden'>likes. Like</span>
				</button>
			</div>
		</article>
	);
};

export default Thread;
