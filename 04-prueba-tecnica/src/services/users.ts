import type { Users } from "../types";

export const apiData = async ({ pageParam = 1 }): Promise<Page> => {
	const data = await fetch(
		`https://randomuser.me/api/?page=${pageParam}&results=10&seed=david`,
	);
	if (!data.ok) {
		throw new Error("Error fetching");
	}
	const res = await data.json();
	const response: Users[] = res.results;
	const currentPage = Number(res.info.page + 1);
	const nextCursor = currentPage > 3 ? undefined : currentPage;
	return {
		users: response,
		nextCursor,
	};
};
