import type { TodoTitle } from "../types";
import { CreateTodo } from "./CreateTodo";

interface Props {
	onAddTodo: (title: TodoTitle) => void;
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
	return (
		<header className="header">
			<h1>
				todo
				<img
					style={{ width: "60px", height: "auto" }}
					src="https://static.vecteezy.com/system/resources/previews/025/351/950/non_2x/abstract-letter-ts-logo-design-with-line-dot-connection-for-technology-and-digital-business-company-vector.jpg"
					alt="imagen de logo de typescript"
				/>
			</h1>
			<CreateTodo saveTodo={onAddTodo} />
		</header>
	);
};
