const getFormattedDate = (date, prefomattedDate = false, hideYear = false) => {
	const day = date.getDate();
	const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");

	if (prefomattedDate) {
		// Today at 10:20
		// Yesterday at 10:20
		return `${prefomattedDate} at ${hours}:${minutes}`;
	}
	if (hideYear) {
		// Jan 10
		return `${month} ${day}`;
	}
	// Jan 10, 2021
	return `${month} ${day}, ${year}`;
};
export const formatDate = (dateParam) => {
	if (!dateParam) {
		return "Oct 21, 2015";
	}

	const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
	const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
	const today = new Date();
	const yesterday = new Date(today - DAY_IN_MS);
	const seconds = Math.round((today - date) / 1000);
	const minutes = Math.round(seconds / 60);
	const isToday = today.toDateString() === date.toDateString();
	const isYesterday = yesterday.toDateString() === date.toDateString();
	const isThisYear = today.getFullYear() === date.getFullYear();

	if (seconds < 5) {
		return "now";
	} else if (seconds < 60) {
		return `${seconds} seconds ago`;
	} else if (minutes < 60) {
		return `${minutes} minutes ago`;
	} else if (isToday) {
		return getFormattedDate(date, "Today"); // Today at 10:20
	} else if (isYesterday) {
		return getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
	} else if (isThisYear) {
		return getFormattedDate(date, false, true); // Jan 10
	}

	return getFormattedDate(date); // Jan 10, 2021 at 10:20
};

export const formatTags = (tags) => {
	let tagStr = "";
	tags.forEach((tag) => {
		tagStr += tag[0] === "#" ? "" : "#";
		tagStr += tag.replaceAll(" ", "-") + " ";
	});
	return tagStr;
};

export const chunk = (arr, size) =>
	Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
		arr.slice(i * size, i * size + size)
	);
