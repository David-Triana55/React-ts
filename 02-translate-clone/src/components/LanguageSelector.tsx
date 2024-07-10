import { Form } from "react-bootstrap";
import { AUTO_LANGUAGE, SectionType, SUPPORTED_LANGUAGES } from "../constants";
import type { FromLanguage, Language } from "../types";

type Props =
	| {
			type: SectionType.FROM;
			value: FromLanguage;
			onChange: (Language: FromLanguage) => void;
	  }
	| {
			type: SectionType.TO;
			value: Language;
			onChange: (Language: Language) => void;
	  };

export const LanguageSelector: React.FC<Props> = ({
	onChange,
	type,
	value,
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value as Language);
	};
	return (
		<Form.Select
			aria-label="selecciona el idioma"
			onChange={handleChange}
			value={value}
		>
			{type === SectionType.FROM && (
				<option value={AUTO_LANGUAGE}>Detectar idioma</option>
			)}
			{Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
				<option key={key} value={key}>
					{value}
				</option>
			))}
		</Form.Select>
	);
};
