import React, { useState } from "react";

import PlayerComponent from "./PlayerComponent";
import { Link, useLocation } from "react-router-dom";

const Thread = ({ thread }) => {
	const location = useLocation();
	const [like, setLike] = useState(false);
	const likeHandler = () => {
		console.log("like!");
		like ? setLike(false) : setLike(true);
	};

	let likeBtnClass = `d-flex align-items-center btn-text squishy thread__icon thread__icon--like ${
		like && "liked"
	}`;

	const regex = /[a-zA-Z ]/g;
	let tags = thread.threadTags.match(regex);
	tags = "#" + tags.join("").replace(" ", " #");

	const shareHandler = () => console.log("share!");
	return (
		<article className='thread audio-container'>
			<p className='mb-0'>
				<strong>{thread.threadPosterUserName}</strong> -{" "}
				<span className='text-muted'>{thread.threadPostDate}</span>
			</p>
			<h3 className='thread__title'>
				{thread.threadName} <span className='thread__tags'>{tags}</span>
			</h3>
			<PlayerComponent audioPath={thread.threadAudioPath} />

			<div className='d-flex justify-content-between thread__icon-container'>
				<Link
					className='d-flex align-items-center  comment-link thread__icon thread__icon--comment squishy'
					to={
						location.pathname === "/"
							? {
									pathname: `/conversation/${thread.threadId}`,
									state: {
										thread: thread,
									},
							  }
							: {
									pathname: "/new",
									state: {
										message: "new comment",
										status: 1,
										threadId: thread.threadId,
									},
							  }
					}
				>
					{thread.threadResponseCount}
					<span className='visually-hidden'>comments. Comment</span>
				</Link>
				<button
					className='btn-text squishy thread__icon thread__icon--share'
					onClick={shareHandler}
				>
					<span className='visually-hidden'>Share</span>
				</button>
				<button className={likeBtnClass} onClick={likeHandler}>
					{thread.threadLikes}
					<span className='visually-hidden'>likes. Like</span>
				</button>
			</div>
		</article>
	);
};

export default Thread;
