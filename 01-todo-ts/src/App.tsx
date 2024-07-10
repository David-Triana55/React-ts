import { useState } from "react";
import { Footer } from "./components/Footer";
import { Todos } from "./components/Todos";
import type { FilterValue } from "./consts";
import { TODO_FILTERS } from "./consts";

import { Header } from "./components/Header";
import type { TodoId, TodoTitle } from "./types";

const mockTodos = [
	{
		id: "1",
		title: "aprender react con ts",
		completed: false,
	},
	{
		id: "2",
		title: "tomar cafe",
		completed: false,
	},
	{
		id: "3",
		title: "Todo 3",
		completed: true,
	},
];

const App = (): JSX.Element => {
	const [todos, setTodos] = useState(mockTodos);
	const [filterSelected, setFilterSelected] = useState<FilterValue>(
		TODO_FILTERS.ALL,
	);

	const handleRemoveTodo = ({ id }: TodoId) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	const handleCompleted = ({ id }: TodoId) => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					completed: !todo.completed,
				};
			}

			return todo;
		});
		console.log(newTodos);

		setTodos(newTodos);
	};

	const handleFilterChange = (filter: FilterValue) => {
		setFilterSelected(filter);
	};

	const activeCount = todos.filter((todo) => !todo.completed).length;
	const completedCount = todos.length - activeCount;
	const handleClearCompleted = () => {
		const newTodos = todos.filter((todo) => !todo.completed);
		setTodos(newTodos);
	};
	const filteredTodos = todos.filter((todo) => {
		if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
		if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
		return todo;
	});

	const saveTodo = ({ title }: TodoTitle): void => {
		const newTodo = {
			id: crypto.randomUUID(),
			title: title,
			completed: false,
		};
		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
	};
	return (
		<div className="todoapp">
			<Header onAddTodo={saveTodo} />
			<Todos
				todos={filteredTodos}
				onRemoveTodos={handleRemoveTodo}
				onCompletedTodos={handleCompleted}
			/>
			<Footer
				activeCount={activeCount}
				filterSelected={filterSelected}
				handleFilterChange={handleFilterChange}
				completedCount={completedCount}
				onClearCompleted={handleClearCompleted}
			/>
		</div>
	);
};

export default App;
