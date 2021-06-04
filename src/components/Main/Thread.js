import React, { useState } from "react";

import PlayerComponent from "./PlayerComponent";
import { Link, useLocation } from "react-router-dom";

const Thread = ({ thread }) => {
	console.log(thread);
	const location = useLocation();
	const [like, setLike] = useState(false);
	const likeHandler = () => {
		console.log("like!");
		like ? setLike(false) : setLike(true);
	};

	let likeBtnClass = `d-flex align-items-center btn-text squishy thread__icon thread__icon--like ${
		like && "liked"
	}`;

	let tags = "";
	thread.threadTags.forEach((tag) => (tags += "#" + tag + " "));

	const shareHandler = () => console.log("share!");
	return (
		<article className='thread audio-container'>
			<p className='mb-0'>
				<strong>{thread.threadCreator.userName}</strong> -{" "}
				<span className='text-muted'>{thread.threadDate}</span>
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
							? `/conversation/${thread.id}`
							: {
									pathname: "/new",
									state: {
										message: "new comment",
										status: 1,
										threadId: thread.id,
									},
							  }
					}
				>
					{thread.threadResponse.length}
					<span className='visually-hidden'>comments. Comment</span>
				</Link>
				<button
					className='btn-text squishy thread__icon thread__icon--share'
					onClick={shareHandler}
				>
					<span className='visually-hidden'>Share</span>
				</button>
				<button className={likeBtnClass} onClick={likeHandler}>
					{thread.threadLike}
					<span className='visually-hidden'>likes. Like</span>
				</button>
			</div>
		</article>
	);
};

export default Thread;
