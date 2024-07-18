import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SortBy, type Users } from "../types.d";

const apiData = async ({ pageParam = 1 }: { pageParam?: number }) => {
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

export function useListUser() {
	const queryClient = useQueryClient();
	const [rowColor, setRowColor] = useState(false);
	const [filterCountry, setFilterCountry] = useState("");
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);

	const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } =
		useInfiniteQuery<{ nextCursor?: number; users?: Users[] }>({
			queryKey: ["users"],
			queryFn: apiData,
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		});

	console.log(data);

	const users: Users[] = data?.pages?.flatMap((page) => page.users) ?? [];
	const incrementPage = () => {
		fetchNextPage();
	};

	const toggleSortByCountry = () => {
		const newSortingValue =
			sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
		setSorting(newSortingValue);
	};

	const handleRemoveUser = (email: string) => {
		queryClient.setQueryData(["users"], (oldData: any) => {
			console.log(oldData);
			if (!oldData) {
				console.warn("No old data available.");
				return oldData;
			}

			const updatedPages = oldData.pages.map((page) => ({
				...page,
				users: page.users.filter((user) => user.email !== email),
			}));

			return {
				...oldData,
				pages: updatedPages,
			};
		});
	};

	const changeRowColor = () => {
		setRowColor(!rowColor);
	};

	const handleChangeSort = (sort: SortBy) => {
		setSorting(sort);
	};
	const restoreUserList = () => {
		refetch();
	};

	const filteredUsers = useMemo(() => {
		console.log("calculate filteredUsers");
		return filterCountry != null && filterCountry.length > 0
			? users?.filter((user) => {
					return user.location.country
						.toLowerCase()
						.includes(filterCountry.toLowerCase());
				})
			: users;
	}, [users, filterCountry]);

	const sortedUsers: Users[] | undefined = useMemo(() => {
		console.log("calculate sortedUsers");

		if (sorting === SortBy.NONE) return filteredUsers;
		if (sorting === SortBy.NAME) {
			return [...filteredUsers].sort((a, b) =>
				a.name.first.localeCompare(b.name.first),
			);
		}
		if (sorting === SortBy.LAST) {
			return [...filteredUsers].sort((a, b) =>
				a.name.last.localeCompare(b.name.last),
			);
		}
		if (sorting === SortBy.COUNTRY) {
			return [...filteredUsers].sort((a, b) =>
				a.location.country.localeCompare(b.location.country),
			);
		}
	}, [filteredUsers, sorting]);

	return {
		changeRowColor,
		rowColor,
		sorting,
		toggleSortByCountry,
		restoreUserList,
		setFilterCountry,
		handleChangeSort,
		sortedUsers,
		handleRemoveUser,
		hasNextPage,
		isError,
		isLoading,
		incrementPage,
	};
}
