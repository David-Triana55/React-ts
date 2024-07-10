import type { TodoId, Todo as TodoType } from "../types";

interface Props extends TodoType {
	onRemoveTodos: ({ id }: TodoId) => void;
	onCompletedTodos: ({ id }: TodoId) => void;
}

export const Todo: React.FC<Props> = ({
	id,
	completed,
	title,
	onRemoveTodos,
	onCompletedTodos,
}) => {
	return (
		<div className="view">
			<input
				className="toggle"
				type="checkbox"
				checked={completed}
				onChange={() => {
					onCompletedTodos({ id });
				}}
			/>
			<label>{title}</label>
			<button
				className="destroy"
				type="button"
				onClick={() => {
					onRemoveTodos({ id });
				}}
			/>
		</div>
	);
};
