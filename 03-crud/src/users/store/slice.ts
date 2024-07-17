import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { User, UserId, UserWithId } from "../types.d";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "David",
		email: "David@gmail.com",
		github: "David-Triana55",
	},
	{
		id: "2",
		name: "Felipe",
		email: "Felipe@gmail.com",
		github: "Felipe@gmail.com",
	},
	{
		id: "3",
		name: "Pablo",
		email: "Pablo@gmail.com",
		github: "Pablo",
	},
	{
		id: "4",
		name: "Ivan",
		email: "Ivan@gmail.com",
		github: "Ivan",
	},
];

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state");
	if (persistedState) {
		return JSON.parse(persistedState).users;
	}
	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id: string = crypto.randomUUID();

			state.push({
				id,
				...action.payload,
			});
		},

		deleteById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			const newState = state.filter((user) => user.id !== id);
			return newState;
		},

		rollBackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				state.push(action.payload);
			}
		},
	},
});

export const { rollBackUser, addNewUser, deleteById } = usersSlice.actions;

export default usersSlice.reducer;
