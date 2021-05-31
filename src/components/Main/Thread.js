import React, { useState } from "react";

import PlayerComponent from "./PlayerComponent";
import { Link, useLocation } from "react-router-dom";

const Thread = ({ thread }) => {
	const location = useLocation();
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

	const formatTags = (tags) => {
		let tagStr = "";
		tags.forEach((tag) => {
			tagStr += "#" + tag.replaceAll(" ", "-") + " ";
		});
		return tagStr;
	};

	const formatDate = (date) => {
		let d = new Date(date);
		let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
		let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
		let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
		let hr = d.getHours();
		let min = d.getMinutes();
		return `${da}/${mo}/${ye}, ${hr}:${min}`;
	};

	const shareHandler = () => console.log("share!");
	return (
		<article className='thread audio-container'>
			<p className='mb-0'>
				<strong>{thread.threadPosterUserName}</strong>{" "}
				<span className='text-muted'>
					- {formatDate(thread.threadPostDate)}
				</span>
			</p>
			<h3 className='thread__title'>{thread.threadTitle}</h3>
			<p className='thread__tags'>{formatTags(thread.threadTags)}</p>
			<PlayerComponent audioPath={thread.threadAudioPath} />

			<div className='d-flex justify-content-between thread__icon-container'>
				<Link
					className='d-flex align-items-center  comment-link thread__icon thread__icon--comment squishy'
					to={
						location.pathname === "/"
							? `/conversation/${thread.threadId}`
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
