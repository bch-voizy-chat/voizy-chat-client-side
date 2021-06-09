import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import Recorder from "../components/Main/Recorder";

const NewAudio = (props) => {
	const { currentUser } = useAuth();
	const [audioTags, setAudioTags] = useState([]);
	const [audioTitle, setAudioTitle] = useState("");

	const isComment = props.location.state.status;
	let threadId;
	if (isComment) {
		/** If the new audio is a comment, a threadId is associated to it */
		threadId = props.location.state.threadId;
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

	function handleAudioStop(data) {
		setAudioDetails(data);
	}

	function handleAudioUpload() {
		// POST endpoint
		const targetUrl =
			"https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/addthread";

		// (httpbin) PUBLIC SERVICE FOR TESTING REST APIs
		const testtUrl = "https://httpbin.org/post";

		const audioFileName =
			audioTitle.replace(/\s+/g, "-") +
			"_" +
			currentUser.userId +
			"_" +
			Date.now();

		// Creation of the FormData object
		const formData = new FormData();
		// Addition of data to the FormData object
		formData.append("file", audioDetails.blob, audioFileName + ".ogg");
		formData.append("userid", currentUser.userId);
		formData.append("password", currentUser.password);
		formData.append("threadtags", JSON.stringify(audioTags));
		formData.append("threadTitle", audioTitle);

		fetch(targetUrl, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("Success:", result);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	function handleReset() {
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
	}

	return (
		<div>
			{isComment ? "Comment for thread " + threadId : "New thread"}
			<Recorder
				audioDetails={audioDetails}
				setAudioDetails={setAudioDetails}
				handleAudioStop={handleAudioStop}
				handleAudioUpload={handleAudioUpload}
				handleReset={handleReset}
				setAudioTags={setAudioTags}
				setAudioTitle={setAudioTitle}
			/>
		</div>
	);
};

export default NewAudio;
