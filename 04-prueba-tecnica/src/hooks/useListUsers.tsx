import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { InfiniteQueryData, Users } from "../types.d";
import { SortBy } from "../types.d";
import { useUser } from "./useUser";

export function useListUser() {
	const queryClient = useQueryClient();
	const [rowColor, setRowColor] = useState(false);
	const [filterCountry, setFilterCountry] = useState("");
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);

	const { fetchNextPage, refetch, users, isError, isLoading, hasNextPage } =
		useUser();

	const incrementPage = () => {
		fetchNextPage();
	};

	const toggleSortByCountry = () => {
		const newSortingValue =
			sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
		setSorting(newSortingValue);
	};

	const handleRemoveUser = (email: string) => {
		queryClient.setQueryData<InfiniteQueryData>(["users"], (oldData) => {
			console.log(oldData);
			if (!oldData) {
				console.warn("No old data available.");
				return oldData;
			}

			const updatedPages = oldData.pages.map((page) => ({
				...page,
				users: page.users.filter((user: Users) => user.email !== email),
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
