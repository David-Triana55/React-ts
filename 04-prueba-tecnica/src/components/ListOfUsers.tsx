import { SortBy, type Users } from "../types.d";

interface Props {
	users: Users[] | undefined;
	color: boolean;
	removeUser: (email: string) => void;
	changeSorting: (sort: SortBy) => void;
}

export function ListOfUsers({
	users,
	removeUser,
	color,
	changeSorting,
}: Props) {
	return (
		<table>
			<thead>
				<tr>
					<th>Foto</th>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<th
						onClick={() => {
							changeSorting(SortBy.NAME);
						}}
					>
						Nombre
					</th>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<th
						onClick={() => {
							changeSorting(SortBy.LAST);
						}}
					>
						Apellido
					</th>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<th
						onClick={() => {
							changeSorting(SortBy.COUNTRY);
						}}
					>
						País
					</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{users?.map((user, idx) => {
					const isColorRow = idx % 2 === 0 && color ? "#555" : "transparent";

					return (
						<tr key={user.email} style={{ background: isColorRow }}>
							<td>
								<img
									style={{ borderRadius: "50%" }}
									src={user.picture.thumbnail}
									alt="user"
								/>
							</td>
							<td>{user.name.first}</td>
							<td>{user.name.last}</td>
							<td>{user.location.country}</td>
							<td>
								<button type="button" onClick={() => removeUser(user.email)}>
									Delete
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
