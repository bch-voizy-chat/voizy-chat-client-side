import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Thread from "../components/Main/Thread";
import apiServices from "../services/api";

const Home = () => {
	const [threads, setThreads] = useState([]);
	const fetchData = async () => {
		const res = await apiServices.getAllThreads();
		setThreads(res);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const threadList = threads.map((thread) => {
		return <Thread key={thread.threadId} thread={thread} />;
	});

	return (
		<div>
			<Link
				to={{
					pathname: "/new",
					state: { message: "new thread", status: 0 },
				}}
				className='squishy new-audio-link'
				title='Start a conversation.'
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
					<title>New audio icon</title>
					<line x1='30' y1='5' x2='30' y2='55' />
					<line x1='5' y1='30' x2='55' y2='30' />
				</svg>
			</Link>
			<section>{threadList}</section>
		</div>
	);
};

export default Home;
