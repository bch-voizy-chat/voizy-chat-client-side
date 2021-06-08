import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

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
		console.log(currentUser);
		console.log(audioDetails.blob);
		console.log("handleAudioUpload clicked");

		// POST endpoint
		// const targetUrl = "https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/addthread";
		
		// (httpbin) PUBLIC SERVICE FOR TESTING REST APIs
		const testtUrl = "https://httpbin.org/post";

		// Collecting the form data in an object
		let newAudioForm = document.getElementById("newAudioForm");

		// Creation of the FormData object
		let newAudioData = new FormData(newAudioForm);

		// Other FormData object for tetsting
		// let newAudioData2 = new FormData();

		// Form data formatting and other details to post the form.
		let audioTitle = document.getElementById("audioTitle").value;
		let tags = document.getElementById("audioTags").value;
		let audioTags = tags.split(',');
		let userid = "dhRgwhDp6B7uGE9aCvW5";
		let email = "testUser@testemail.com";
		let password = 123;
		let audioFileName = audioTitle.replace(/\s+/g,'-')+"_"+userid+"_"+Date.now();

		// Addition of data to the FormData object
		newAudioData.append("audioTitle", audioTitle);
		newAudioData.append("audioTags", audioTags);
		// newAudioData.append("hidden", document.getElementById("hiddenvalue").value);
		newAudioData.append("userid", userid);
		newAudioData.append("password", password);
		newAudioData.append("email", email);
		newAudioData.append("newAudio", audioDetails.blob, audioFileName+".ogg");

		// console.log(newAudioForm);

		console.log(audioTitle);
		console.log(audioTags);
		console.log(audioFileName);
		console.log(newAudioData);

		// TESTS with newAudioData2
		// newAudioData2.append("audioTitle", audioTitle);
		// newAudioData.append("audioTags", audioTags);
		// console.log(newAudioData2);


		// POST REQUEST
			fetch(testtUrl, {
			method: "POST",
			body: newAudioData
		}).then(response => {
			return response.json();
		}).then(text => {
			console.log(text);
		}).catch(err => {
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
