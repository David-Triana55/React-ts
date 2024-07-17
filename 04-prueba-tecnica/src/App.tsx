import "./App.css";
import { ListOfUsers } from "./components/ListOfUsers";
import { useListUser } from "./hooks/useListUsers";
import { SortBy } from "./types.d";

function App() {
	const {
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
	} = useListUser();
	return (
		<>
			<h1>prueba tecnica</h1>
			<header>
				<button onClick={changeRowColor} type="button">
					{!rowColor ? "colorear filas" : "descolorear filas"}
				</button>
				<button type="button" onClick={toggleSortByCountry}>
					{sorting === SortBy.COUNTRY
						? "No ordenar por país"
						: "Ordenar por país"}
				</button>
				<button onClick={restoreUserList} type="button">
					Restaurar estado inicial
				</button>
				<input
					onChange={(event) => setFilterCountry(event.target.value)}
					type="text"
					placeholder="filtrar por pais"
				/>
			</header>
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
