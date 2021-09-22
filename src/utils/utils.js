export const formatDate = (date) => {
	let d = new Date(date);
	let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
	let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
	let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
	let hr = d.getHours();
	let min = d.getMinutes().toString().padStart(2, "0");
	return `${da}/${mo}/${ye}, ${hr}:${min}`;
};

export const formatTags = (tags) => {
	let tagStr = "";
	tags.forEach((tag) => {
		tagStr += tag[0] === "#" ? "" : "#";
		tagStr += tag.replaceAll(" ", "-") + " ";
	});
	return tagStr;
};
