import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { MdCompareArrows } from "react-icons/md";
import "./App.css";
import { LanguageSelector } from "./components/LanguageSelector";
import { TextArea } from "./components/TextArea";
import { AUTO_LANGUAGE, SectionType } from "./constants";
import { useDebounce } from "./hooks/useDebounce";
import { useStore } from "./hooks/useStore";
import { translate } from "./services/translate";

function App() {
	const {
		fromLanguage,
		toLanguage,
		setFromLanguage,
		interchangeLanguages,
		setToLanguage,
		fromText,
		result,
		setFromText,
		setResult,
		loading,
	} = useStore();
	const debouncedFromText = useDebounce(fromText, 300);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (debouncedFromText === "") return;

		translate({ fromLanguage, toLanguage, text: debouncedFromText })
			.then((result) => {
				if (result == null) return;
				setResult(result);
			})
			.catch(() => {
				setResult("Error");
			});
	}, [debouncedFromText, fromLanguage, toLanguage]);

	return (
		<Container fluid>
			<h2>Google Translate</h2>

			<Row>
				<Col xs="auto">
					<Stack gap={2}>
						<LanguageSelector
							type={SectionType.FROM}
							value={fromLanguage}
							onChange={setFromLanguage}
						/>
						<TextArea
							type={SectionType.FROM}
							value={fromText}
							onChange={setFromText}
						/>
					</Stack>
				</Col>
				<Col xs="auto">
					<Button
						variant="link"
						disabled={fromLanguage === AUTO_LANGUAGE}
						onClick={() => {
							interchangeLanguages();
						}}
					>
						<MdCompareArrows style={{ width: "24px", height: "24px" }} />
					</Button>
				</Col>
				<Col xs="auto">
					<Stack gap={2}>
						<LanguageSelector
							type={SectionType.TO}
							value={toLanguage}
							onChange={setToLanguage}
						/>
						<TextArea
							value={result}
							loading
							type={SectionType.TO}
							onChange={setResult}
						/>
					</Stack>
				</Col>
			</Row>
		</Container>
	);
}
export default App;
