import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "../service/comments";
import { postComment } from "../service/comments";

export function Formulario() {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: postComment,
		onMutate: async (newComment) => {
			await queryClient.cancelQueries(["comments"]);

			const previousComments = queryClient.getQueryData(["comments"]);
			console.log("previousComments------------>", previousComments);

			queryClient.setQueryData(
				["comments"],
				(oldData?: Comment[]): Comment[] => {
					const newCommentToAdd = { ...newComment, preview: true };

					console.log("newCommentToAdd------------>", newCommentToAdd);
					console.log("oldData------------>", oldData);

					if (oldData == null) return [newCommentToAdd];
					return [...oldData, newCommentToAdd];
				},
			);

			return { previousComments }; // -----> context
		},
		onError: (error, variables, context) => {
			console.error(error);
			if (context?.previousComments != null) {
				queryClient.setQueryData(["comments"], context.previousComments);
			}
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["comments"],
			});
		},
	});
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		if (isPending) return;

		event.preventDefault();

		// ---> ???
		const data = new FormData(event.currentTarget);
		const message = data.get("message")?.toString() ?? "";
		const title = data.get("title")?.toString() ?? "";

		if (title !== "" && message !== "") {
			mutate({ title, message });
		}
	};

	return (
		<>
			<form
				className={`${isPending ? "opacity-40" : ""} block max-w-xl px-4 m-auto`}
				onSubmit={handleSubmit}
			>
				<div className="mb-6">
					<label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
						Introduce título
					</label>
					<input
						name="title"
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="Este comentario es el mejor"
					/>
				</div>
				<textarea
					name="message"
					id="message"
					rows={4}
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Quería comentar que..."
				/>

				<button
					disabled={isPending}
					type="submit"
					className="mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2"
				>
					{isPending ? "Enviando comentario..." : "Enviar comentario"}
				</button>
			</form>
		</>
	);
}
