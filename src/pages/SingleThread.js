import React, { useState } from "react";

import Thread from "../components/Main/Thread";
import Comment from "../components/Main/Comment";

const SingleThread = () => {
	/** [1,2,3] for dev purpose */
	const [comments, setComments] = useState([1, 2, 3]);

	const commentList = comments.map((comment) => {
		return <Comment comment={comment} />;
	});

	return (
		<div className='content'>
			<Thread />
			{commentList}
		</div>
	);
};

export default SingleThread;
