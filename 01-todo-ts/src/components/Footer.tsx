import type { FilterValue } from "../consts";
import { Filters } from "./Filters";

interface Props {
	activeCount: number;
	completedCount: number;
	filterSelected: FilterValue;
	onClearCompleted: () => void;
	handleFilterChange: (filter: FilterValue) => void;
}

export const Footer: React.FC<Props> = ({
	activeCount = 0,
	completedCount = 0,
	onClearCompleted,
	handleFilterChange,
	filterSelected,
}) => {
	return (
		<footer className="footer">
			<span className="todo-count">
				<strong>{activeCount}</strong>{" "}
				{(activeCount > 1 || activeCount === 0) && "tareas pendientes"}
				{activeCount === 1 && "tarea pendiente"}
			</span>

			<Filters
				filterSelected={filterSelected}
				onFilterChange={handleFilterChange}
			/>

			{completedCount > 0 && (
				<button
					type="button"
					className="clear-completed"
					onClick={onClearCompleted}
				>
					Borrar completadas
				</button>
			)}
		</footer>
	);
};
