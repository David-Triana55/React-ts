import type { CommentWithId } from "../service/comments";

export const Results = ({ data }: { data?: CommentWithId[] }) => {
	console.log("data--------->", data);

	return (
		<ul className="flex flex-col items-center w-full ">
			<li className="w-full flex flex-col ">
				{data?.map((comment) => {
					const isPreview =
						comment.preview === true ? "bg-gray-400 opacity-40" : "bg-white";

					return (
						<article
							key={comment.id}
							className={`${isPreview} block w-full p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 justify-center flex-col mt-5`}
						>
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
								{comment.title}
							</h5>
							<p className="font-normal text-gray-700">{comment.message}</p>
						</article>
					);
				})}
			</li>
		</ul>
	);
};
