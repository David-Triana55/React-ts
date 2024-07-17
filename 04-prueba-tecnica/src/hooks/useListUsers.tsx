import { useEffect, useMemo, useRef, useState } from "react";
import { SortBy, type Users } from "../types.d";

export function useListUser() {
	const [users, setUsers] = useState<Users[]>([]);
	const [rowColor, setRowColor] = useState(false);
	const [filterCountry, setFilterCountry] = useState("");
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
	const [error, setError] = useState(false);
	const original = useRef([]);

	useEffect(() => {
		const apiData = async () => {
			try {
				const data = await fetch("https://randomuser.me/api/?results=100");
				const res = await data.json();
				setUsers(res.results);
				original.current = res.results;
			} catch (err) {
				setError(true);
				console.log(err);
			}
		};
		apiData();
	}, []);

	const toggleSortByCountry = () => {
		const newSortingValue =
			sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
		setSorting(newSortingValue);
	};
	const handleRemoveUser = (email: string) => {
		const newUsers = users.filter((user) => user.email !== email);
		setUsers(newUsers);
	};

	const changeRowColor = () => {
		setRowColor(!rowColor);
	};

	const handleChangeSort = (sort: SortBy) => {
		setSorting(sort);
	};
	const restoreUserList = () => {
		setUsers(original.current);
	};

	const filteredUsers = useMemo(() => {
		console.log("calculate filteredUsers");
		return filterCountry != null && filterCountry.length > 0
			? users.filter((user) => {
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
		error,
	};
}
