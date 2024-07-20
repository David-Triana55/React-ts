export interface Comment {
	title: string;
	message: string;
	preview?: boolean;
}

export interface CommentWithId extends Comment {
	id: string;
}

const apiKey = "$2a$10$OdTRma10eUiVcrjn57hfXOWQ/nPEWRBON7IFTi/N.VThJ9yov5AyS";

export const getComments = async () => {
	const response = await fetch(
		"https://api.jsonbin.io/v3/b/669ad218ad19ca34f88a050a",
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-Access-Key": apiKey,
			},
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch comments.");
	}

	const json = await response.json();
	console.log(json);

	return json.record;
};

// const delay = async (ms: number) =>
// 	await new Promise((resolve) => setTimeout(resolve, ms));

export const postComment = async (comment: Comment) => {
	const comments = await getComments();

	const id = crypto.randomUUID();
	const newComment = { ...comment, id };
	const commentsToSave = [...comments, newComment];

	const response = await fetch(
		"https://api.jsonbin.io/v3/b/669ad218ad19ca34f88a050a",
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-Access-Key": apiKey,
			},
			body: JSON.stringify(commentsToSave),
		},
	);

	if (!response.ok) {
		throw new Error("Failed to post comment.");
	}

	return newComment;
};
