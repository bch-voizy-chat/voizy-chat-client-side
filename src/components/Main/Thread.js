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

	const shareHandler = () => console.log("share!");
	return (
		<article className='thread audio-container'>
			<h2 className='audio__title'>Audio {thread}</h2>
			<PlayerComponent />
			<div className='d-flex justify-content-between thread__icon-container'>
				<Link
					className='d-flex align-items-center  comment-link thread__icon thread__icon--comment squishy'
					to={
						location.pathname === "/"
							? `/conversation/${thread}`
							: {
									pathname: "/new",
									state: {
										message: "new comment",
										status: 1,
										threadId: thread,
									},
							  }
					}
				>
					22<span className='visually-hidden'>comments. Comment</span>
				</Link>
				<button
					className='btn-text squishy thread__icon thread__icon--share'
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
