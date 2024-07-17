import { addNewUser, deleteById } from "../store/slice";
import type { User, UserId } from "../types.d";

import { useAppDispatch } from "./store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteById(id));
	};

	return { addUser, removeUser };
};
