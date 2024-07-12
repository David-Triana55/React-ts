import { Form } from "react-bootstrap";
import { SectionType } from "../constants";

interface Props {
	loading?: boolean;
	type: SectionType;
	value: string;
	onChange: (value: string) => void;
}

const commonStyles = { border: 0, height: "200px", resize: "none" };

const getPlaceholder = ({
	type,
	loading,
}: { type: SectionType; loading?: boolean }) => {
	if (type === SectionType.FROM) return "Introducir texto";
	if (loading === true) return "Cargando...";
	return "Traduccion";
};

export const TextArea: React.FC<Props> = ({
	loading,
	type,
	value,
	onChange,
}) => {
	const styles =
		type === SectionType.FROM
			? commonStyles
			: { ...commonStyles, backgroundColor: "#f5f5f5" };

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(event.target.value);
	};

	return (
		<Form.Control
			style={styles}
			as="textarea"
			autoFocus={type === SectionType.FROM}
			placeholder={getPlaceholder({ type, loading })}
			onChange={handleChange}
			value={value}
			disabled={type === SectionType.TO}
		/>
	);
};
