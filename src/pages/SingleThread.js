import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Thread from "../components/Main/Thread";
import Comment from "../components/Main/Comment";

const SingleThread = () => {
	const { threadId } = useParams();

	const [thread, setThread] = useState({
		threadAudioPath: "",
		threadId: "",
		threadLikes: 0,
		threadPostDate: 0,
		threadPosterUserName: "",
		threadResponseCount: 0,
		threadTags: [],
		threadTitle: "",
	});
	const [comments, setComments] = useState([]);

	const fetchData = async (threadId) => {
		try {
			let res = await axios.get(
				`https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/threads/${threadId}`
			);
			setComments(res.data.responses);
			setThread(res.data.thread);
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData(threadId);
	}, [threadId]);

	const commentList = comments.map((comment) => {
		return (
			<li key={comment.responseId}>
				<Comment response={comment} />
			</li>
		);
	});

	return (
		<div className='content'>
			<Link
				to={{
					pathname: "/new",
					state: {
						message: "new comment",
						status: 1,
						threadId: thread.threadId,
						threadPosterUserName: thread.threadPosterUserName,
					},
				}}
				className='squishy new-audio-link'
				title='Add a comment.'
			>
				<svg
					role='img'
					version='1.1'
					className='new-audio-link__add-icon'
					xmlns='http://www.w3.org/2000/svg'
					x='0px'
					y='0px'
					viewBox='0 0 60 60'
				>
					<title>New comment icon</title>
					<line x1='30' y1='5' x2='30' y2='55' />
					<line x1='5' y1='30' x2='55' y2='30' />
				</svg>
			</Link>
			<Thread thread={thread} />
			<ol>{commentList}</ol>
		</div>
	);
};

export default SingleThread;
