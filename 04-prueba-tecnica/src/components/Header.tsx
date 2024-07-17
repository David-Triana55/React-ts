import { SortBy } from "../types.d";

interface Props {
	changeRowColor: () => void;
	rowColor: boolean;
	sorting: SortBy;
	toggleSortByCountry: () => void;
	restoreUserList: () => void;
	setFilterCountry: React.Dispatch<React.SetStateAction<string>>;
}

export function Header({
	changeRowColor,
	rowColor,
	sorting,
	toggleSortByCountry,
	restoreUserList,
	setFilterCountry,
}: Props) {
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
		</>
	);
}
