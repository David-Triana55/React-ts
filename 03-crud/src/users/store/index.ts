import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import type { UserWithId } from "../types.d";

import usersReducer, { rollBackUser } from "./slice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

interface Action {
	type: string;
	payload: string;
}

const pesistanceMiddleware: Middleware = (store) => (next) => (action) => {
	const { payload } = action as Action;

	console.log(store.getState()); // ver como estaba todo el estado

	console.log(action); // ver que action se ejecuto y poder recuperar informacion del elemento eliminado
	const removeUser = payload;
	console.log(`se elimino el usuario: ${removeUser}`);
	next(action);
	console.log(store.getState()); // ver como quedo el estado despues de eliminar el elemento

	localStorage.setItem("__redux__state", JSON.stringify(store.getState()));
};

// Define your middleware
const syncWithDataBase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action as Action;
	const previousState = store.getState();
	next(action);
	console.log(action);
	if (type === "users/deleteById") {
		const userToRemove = previousState.users.find(
			(user: UserWithId) => user.id === payload, // Note the optional chaining
		);

		fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) toast.success(`Successfully deleted id ${payload}`);
			})
			.catch((err) => {
				toast.error(`Error deleting user ${payload}`);
				if (userToRemove) store.dispatch(rollBackUser(userToRemove));
				console.error(err);
			});
	}
};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(pesistanceMiddleware, syncWithDataBase),
});
