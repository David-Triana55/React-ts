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
		isError,
		changeRowColor,
		setFilterCountry,
		sorting,
		toggleSortByCountry,
		restoreUserList,
		isLoading,
		hasNextPage,
		incrementPage,
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
			{sortedUsers?.length > 0 && (
				<>
					<ListOfUsers
						changeSorting={handleChangeSort}
						users={sortedUsers}
						removeUser={handleRemoveUser}
						color={rowColor}
					/>
				</>
			)}

			{isLoading && <h2>Cargando...</h2>}
			{isError && <h2>Error con la peticion</h2>}
			{!isLoading && !isError && sortedUsers?.length === 0 && (
				<p>No hay usuarios</p>
			)}
			{!isLoading && !isError && hasNextPage === true && (
				<button type="button" onClick={incrementPage}>
					Cargar más información
				</button>
			)}

			{!isLoading && !isError && hasNextPage === false && (
				<p>No hay más resultados</p>
			)}
		</>
	);
}

export default App;
