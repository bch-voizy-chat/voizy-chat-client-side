import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

import Recorder from "../components/Main/Recorder";

const NewAudio = (props) => {
	const { currentUser } = useAuth();

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
		console.log(data);
		setAudioDetails(data);
	}

	function handleAudioUpload() {
		// console.log(currentUser);
		// console.log(audioDetails.blob);
		// console.log("handleAudioUpload clicked");

		// POST endpoint
		const targetUrl =
			"https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/addthread";

		// "https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/addthread"
		// (httpbin) PUBLIC SERVICE FOR TESTING REST APIs
		const testtUrl = "https://httpbin.org/post";

		// Creation of the FormData object
		let newAudioData = new FormData();

		// Other FormData object for tetsting
		// let newAudioData2 = new FormData();

		// Form data formatting and other details to post the form.
		let audioTitle = document.getElementById("audioTitle").value;
		let tags = document.getElementById("audioTags").value;
		let audioTags = tags.split(", ");
		let userid = currentUser.userId;
		let password = currentUser.password;
		let audioFileName =
			audioTitle.replace(/\s+/g, "-") + "_" + userid + "_" + Date.now();

		// Addition of data to the FormData object
		newAudioData.append("audioTitle", audioTitle);
		newAudioData.append("audioTags", '["test","sound test2"]');
		newAudioData.append("userid", userid);
		newAudioData.append("password", password);
		newAudioData.append("file", audioDetails.blob, audioFileName + ".ogg");

		// console.log(newAudioForm);

		// console.log(audioTitle);
		// console.log(audioTags);
		// console.log(audioFileName);
		// console.log(newAudioData);

		// TESTS with newAudioData2
		// newAudioData2.append("audioTitle", audioTitle);
		// newAudioData.append("audioTags", audioTags);
		// console.log(newAudioData2);

		// POST REQUEST
		fetch(targetUrl, {
			method: "POST",
			body: newAudioData,
			// mode: "no-cors",
		})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
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
			/>
		</div>
	);
};

export default NewAudio;
