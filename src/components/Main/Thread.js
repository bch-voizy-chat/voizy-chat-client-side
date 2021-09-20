import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

import PlayerComponent from "./PlayerComponent";
import { Link, useLocation, useHistory } from "react-router-dom";

const Thread = ({ thread }) => {
	const { currentUser, isLoggedIn } = useAuth();
	const history = useHistory();
	const location = useLocation();

	const storedLike = localStorage.getItem(`${thread.threadId} liked`);
	const [like, setLike] = useState(storedLike);

	const [likeCount, setLikeCount] = useState(thread.threadLikes);

	useEffect(() => {
		if (location.pathname !== "/" && !likeCount) {
			setLikeCount(likeCount + thread.threadLikes);
		}
	}, [location.pathname, likeCount, thread.threadLikes]);

	const likeHandler = () => {
		if (!isLoggedIn) {
			history.push({
				pathname: "/login",
				state: { message: "user not logged in", status: 400 },
			});
		} else if (like) {
			setLike(false);
			setLikeCount(likeCount - 1);
			/** Post update: likeCount + if user liked the post. */
		} else {
			setLike(true);
			setLikeCount(likeCount + 1);
			/** Post update */
			if (!storedLike) {
				const threadLikeUrl =
					"https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/likeThread";
				const data = {
					userid: currentUser.userId,
					password: currentUser.password,
					threadId: thread.threadId,
				};
				axios
					.post(threadLikeUrl, data)
					.then((res) => console.log(res))
					.catch((err) => console.log(err));
				localStorage.setItem(`${thread.threadId} liked`, true);
			}
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
		let min = d.getMinutes().toString().padStart(2, "0");
		return `${da}/${mo}/${ye}, ${hr}:${min}`;
	};

	const shareData = {
		title: thread.threadTitle,
		text: `Listen to what ${thread.threadPosterUserName} has to say`,
		url: `/conversation/${thread.threadId}`,
	};
	const shareHandler = async () => {
		if (!isLoggedIn) {
			history.push({
				pathname: "/login",
				state: { message: "user not logged in", status: 400 },
			});
		} else {
			try {
				await navigator.share(shareData);
			} catch (err) {
				console.log(err);
			}
		}
	};

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
					className='btn-text squishy mobile-only thread__icon thread__icon--share'
					onClick={shareHandler}
				>
					<span className='visually-hidden'>Share</span>
				</button>
				<button className={likeBtnClass} onClick={likeHandler}>
					{likeCount}
					<span className='visually-hidden'>likes. Like</span>
				</button>
			</div>
		</article>
	);
};

export default Thread;
