import axios from "axios";

const baseUrl = "https://us-central1-voizy-chat.cloudfunctions.net/voizyChat";

const getAllThreads = async () => {
	try {
		let res = await axios.get(baseUrl + "/threads");
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

const getThread = async (threadId) => {
	try {
		let res = await axios.get(`${baseUrl}/threads/${threadId}`);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

const likeThread = async (data) => {
	try {
		let res = await axios.post(baseUrl + "/likeThread", data);
		console.log(res);
	} catch (err) {
		console.error(err);
	}
};

const likeResponse = async (data) => {
	try {
		let res = await axios.post(baseUrl + "/likeResponse", data);
		console.log(res);
	} catch (err) {
		console.error(err);
	}
};

const postAudio = async (targetUrl, formData) => {
	try {
		let res = await axios.post(baseUrl + targetUrl, formData);
		return res;
	} catch (err) {
		console.error("Error:", err);
	}
};

const apiServices = {
	getAllThreads,
	likeThread,
	getThread,
	likeResponse,
	postAudio,
};

export default apiServices;
