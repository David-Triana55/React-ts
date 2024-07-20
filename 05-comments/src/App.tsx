import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { Formulario } from "./components/Formulario";
import { Results } from "./components/Results";
import { type CommentWithId, getComments } from "./service/comments";

function App() {
	const { data, isLoading, error } = useQuery<CommentWithId[]>({
		queryKey: ["comments"], // <-----
		queryFn: getComments,
	});

	return (
		<main className="grid h-screen grid-cols-2 bg-black">
			<div className="col-span-1 p-8 bg-slate-400">
				{isLoading && <strong>Cargando...</strong>}
				{error != null && <strong>Algo ha ido mal</strong>}
				<Results data={data} />
			</div>
			<div className="col-span-1 p-8 bg-black">
				<Formulario />
			</div>
		</main>
	);
}

export default App;
