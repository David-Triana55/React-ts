import "./App.css";
import { Header } from "./components/Header";
import { ListOfUsers } from "./components/ListOfUsers";
import { useListUser } from "./hooks/useListUsers";

function App() {
	const {
		rowColor,
		handleChangeSort,
		sortedUsers,
		handleRemoveUser,
		error,
		changeRowColor,
		setFilterCountry,
		sorting,
		toggleSortByCountry,
		restoreUserList,
	} = useListUser();
	return (
		<>
			<Header
				changeRowColor={changeRowColor}
				restoreUserList={restoreUserList}
				rowColor={rowColor}
				setFilterCountry={setFilterCountry}
				sorting={sorting}
				toggleSortByCountry={toggleSortByCountry}
			/>
			<ListOfUsers
				changeSorting={handleChangeSort}
				users={sortedUsers}
				removeUser={handleRemoveUser}
				color={rowColor}
			/>
			{error && <h1>Error con la peticion</h1>}
		</>
	);
}

export default App;
