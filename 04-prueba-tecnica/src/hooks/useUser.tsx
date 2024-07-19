import { useInfiniteQuery } from "@tanstack/react-query";
import { apiData } from "../services/users";
import type { InfiniteQueryData, Page, Users } from "../types.d";

export function useUser() {
	const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } =
		useInfiniteQuery<Page, "", InfiniteQueryData>({
			queryKey: ["users"],
			queryFn: apiData,
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		});

	console.log(data);

	const users: Users[] = data?.pages?.flatMap((page) => page?.users) ?? [];

	return {
		users,
		isLoading,
		isError,
		refetch,
		fetchNextPage,
		hasNextPage,
	};
}
