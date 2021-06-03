import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Thread from "../components/Main/Thread";
import Comment from "../components/Main/Comment";

const SingleThread = () => {
	/** [1,2,3] and threadId for dev purpose */
	const [comments, setComments] = useState([1, 2, 3]);
	let threadId = 1;
	let threadPosterUserName = "bob";
	const [thread, setThread] = useState({
		id: 0,
		threadName: "",
		threadAudioPath: "",
		threadDate: "",
		threadTags: [],
		threadCreator: {
			userId: 0,
			userName: "",
		},
	});

	let { id } = useParams();

	const fetchData = async () => {
		try {
			let res = await axios.get(`http://localhost:3001/threads/${id}`);
			setThread(res.data);
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(fetchData, []);

	const commentList = comments.map((comment) => {
		return (
			<li key={comment}>
				<Comment comment={comment} />
			</li>
		);
	});

	return (
		<div className='content'>
			<Thread thread={thread} />
			<Link
				to={{
					pathname: "/new",
					state: {
						message: "new comment",
						status: 1,
						threadId: threadId,
						threadPosterUserName: threadPosterUserName,
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
			<ol>{commentList}</ol>
		</div>
	);
};

export default SingleThread;
