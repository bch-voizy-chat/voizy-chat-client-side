import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import Recorder from "../components/Main/Recorder";
import { useHistory } from "react-router";
import apiServices from "../services/api";

const NewAudio = (props) => {
	const { currentUser } = useAuth();
	const history = useHistory();
	const [audioTags, setAudioTags] = useState([]);
	const [audioTitle, setAudioTitle] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const isComment = props.location.state.status;
	let threadId, threadPosterUserName;
	if (isComment) {
		/** If the new audio is a comment, a threadId is associated to it */
		threadId = props.location.state.threadId;
		threadPosterUserName = props.location.state.threadPosterUserName;
	}
	const [audioDetails, setAudioDetails] = useState({
		url: null,
		blob: null,
		chunks: null,
		duration: {
			h: null,
			m: null,
			s: null,
		},
	});

	const handleAudioStop = (data) => {
		setAudioDetails(data);
	};

	const handleAudioUpload = async () => {
		setIsLoading(true);
		// POST endpoint
		let targetUrl;

		const audioFileName =
			audioTitle.replace(/\s+/g, "-") +
			"_" +
			currentUser.userId +
			"_" +
			Date.now();

		// Creation of the FormData object
		const formData = new FormData();

		if (isComment) {
			targetUrl = "/addresponse";
			// Addition of data to the FormData object
			formData.append("file", audioDetails.blob, audioFileName + ".ogg");
			formData.append("userid", currentUser.userId);
			formData.append("password", currentUser.password);
			formData.append("threadId", threadId);
		} else {
			targetUrl = "/addthread";
			// Addition of data to the FormData object
			formData.append("file", audioDetails.blob, audioFileName + ".ogg");
			formData.append("userid", currentUser.userId);
			formData.append("password", currentUser.password);
			formData.append("threadtags", JSON.stringify(audioTags));
			formData.append("threadTitle", audioTitle);
		}
		let res = await apiServices.postAudio(targetUrl, formData);
		if (res.status === 201) {
			setIsLoading(false);
			history.push("/");
		} else {
			setIsLoading(false);
			alert("Oops! Something went wrong. Please try again.");
		}
	};

	const handleReset = () => {
		const reset = {
			url: null,
			blob: null,
			chunks: null,
			duration: {
				h: null,
				m: null,
				s: null,
			},
		};
		setAudioDetails(reset);
	};

	return (
		<div>
			<h2 className='mt-5 w-100 mx-auto text-center'>
				{isComment
					? "Reply to " + threadPosterUserName
					: "Start a conversation"}
			</h2>
			<Recorder
				audioDetails={audioDetails}
				setAudioDetails={setAudioDetails}
				handleAudioStop={handleAudioStop}
				handleAudioUpload={handleAudioUpload}
				handleReset={handleReset}
				setAudioTags={setAudioTags}
				setAudioTitle={setAudioTitle}
				isComment={isComment}
				isLoading={isLoading}
				threadPosterUserName={threadPosterUserName}
			/>
		</div>
	);
};

export default NewAudio;
