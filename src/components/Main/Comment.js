import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import PlayerComponent from "./PlayerComponent";

const Comment = ({ response }) => {
	const { currentUser, isLoggedIn } = useAuth();
	const history = useHistory();

	const formatDate = (date) => {
		let d = new Date(date);
		let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
		let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
		let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
		let hr = d.getHours();
		let min = d.getMinutes().toString().padStart(2, "0");
		return `${da}/${mo}/${ye}, ${hr}:${min}`;
	};

	const storedLike = localStorage.getItem(`${response.responseId} liked`);

	const [like, setLike] = useState(storedLike);
	const [likeCount, setLikeCount] = useState(response.responseLikes);
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
				const responseLikeUrl =
					"https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/likeResponse";
				const data = {
					userid: currentUser.userId,
					password: currentUser.password,
					threadId: response.responseToThreadId,
					responseId: response.responseId,
				};
				axios
					.post(responseLikeUrl, data)
					.then((res) => console.log(res))
					.catch((err) => console.log(err));
				localStorage.setItem(`${response.responseId} liked`, true);
			}
		}
	};

	let likeBtnClass = `d-flex align-items-center btn-text squishy thread__icon thread__icon--like ${
		like && "liked"
	}`;

	return (
		<div className='comment audio-container'>
			<p>
				<strong>{response.responsePosterUserName}</strong>
				{" replied - "}
				<span className='text-muted'>
					{formatDate(response.responsePostDate)}
				</span>
			</p>
			<PlayerComponent audioPath={response.responseAudioPath} />
			<div className='d-flex justify-content-end thread__icon-container'>
				<button className={likeBtnClass} onClick={likeHandler}>
					{likeCount}
					<span className='visually-hidden'>likes. Like</span>
				</button>
			</div>
		</div>
	);
};

export default Comment;
