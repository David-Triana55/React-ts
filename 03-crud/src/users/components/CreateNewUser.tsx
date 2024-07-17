import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const form = event.target;
		const formData = new FormData(form);

		console.log(formData);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, email, github });
		setResult("ok");
		form.reset();
	};
	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit}>
				<TextInput placeholder="aqui el nombre" name="name" />
				<TextInput placeholder="aqui el email" name="email" />
				<TextInput placeholder="aqui el usuario de github" name="github" />

				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						crear un usuario
					</Button>
					<span>
						{result === "ok" && (
							<Badge style={{ color: "green" }}>Guardado correctamente</Badge>
						)}
						{result === "ko" && (
							<Badge style={{ color: "red" }}>error en los campos</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
}
