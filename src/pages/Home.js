import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Thread from "../components/Main/Thread";
import apiServices from "../services/api";
import { chunk } from "../utils/utils";

const Home = () => {
	const [threads, setThreads] = useState([]);
	const [chunks, setChunks] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [counter, setCounter] = useState(1);
	const chunkSize = 5;

	useEffect(() => {
		const fetchData = async () => {
			const res = await apiServices.getAllThreads();
			const threadChunks = chunk(res, chunkSize);
			setChunks(threadChunks);
			setThreads(threadChunks[0]);
		};
		fetchData();
	}, []);

	const showData = () => {
		setTimeout(() => {
			setThreads([...threads, ...chunks[counter]]);
			setCounter(counter + 1);
			if (counter === chunks.length - 1) setHasMore(false);
		}, 800);
	};

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
			<InfiniteScroll
				dataLength={threads.length}
				next={showData}
				hasMore={hasMore}
				loader={
					<div className='loader'>
						<div></div>
						<div></div>
						<div></div>
					</div>
				}
				endMessage={<p className='scroll-end'>Yay! You have seen it all!</p>}
			>
				{threadList}
			</InfiniteScroll>
		</div>
	);
};

export default Home;
