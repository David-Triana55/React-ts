import { useState } from "react";
import type { TodoTitle } from "../types";

interface Props {
	saveTodo: (title: TodoTitle) => void;
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		saveTodo({ title: inputValue });
		setInputValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				className="new-todo"
				value={inputValue}
				type="text"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setInputValue(e.target.value);
				}}
				placeholder="¿Qué quieres hacer?"
				// biome-ignore lint/a11y/noAutofocus: <explanation>
				autoFocus
			/>
		</form>
	);
};
