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
		console.log(data);
		setAudioDetails(data);
	}

	function handleAudioUpload() {
		console.log(audioTitle);
		console.log(audioTags);
		// POST endpoint
		const targetUrl =
			"https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/addthread";

		// "https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/addthread"
		// (httpbin) PUBLIC SERVICE FOR TESTING REST APIs
		const testtUrl = "https://httpbin.org/post";

		// Creation of the FormData object
		// let newAudioData = new FormData();

		// // Other FormData object for tetsting
		// // let newAudioData2 = new FormData();

		// let tags = document.getElementById("audioTags").value;
		// let audioTags = tags.split(", ");
		let userid = currentUser.userId;
		let password = currentUser.password;
		let audioFileName =
			audioTitle.replace(/\s+/g, "-") + "_" + userid + "_" + Date.now();

		// Addition of data to the FormData object
		// newAudioData.append("audioTitle", audioTitle);

		const formData = new FormData();

		formData.append("file", audioDetails.blob, audioFileName + ".ogg");
		formData.append("userid", userid);
		formData.append("password", password);
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

		// // newAudioData.set("audioTags", '["test","sound test2"]');
		// newAudioData.append("userid", userid);
		// newAudioData.append("password", password);
		// newAudioData.append("threadTitle", audioTitle);
		// // newAudioData.append("fields", fields);
		// newAudioData.append("file", selectedFile);

		// POST REQUEST
		// fetch(targetUrl, {
		// 	method: "POST",
		// 	body: newAudioData,
		// })
		// 	.then((response) => {
		// 		return response.json();
		// 	})
		// 	.then((data) => console.log(data))
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
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
