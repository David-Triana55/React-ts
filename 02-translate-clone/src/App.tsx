import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { MdCompareArrows } from "react-icons/md";
import "./App.css";
import { LanguageSelector } from "./components/LanguageSelector";
import { AUTO_LANGUAGE, SectionType } from "./constants";
import { useStore } from "./hooks/useStore";

function App() {
	const {
		fromLanguage,
		toLanguage,
		setFromLanguage,
		interchangeLanguages,
		setToLanguage,
	} = useStore();

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
						<Form.Control
							as="textarea"
							placeholder="Introducir texto"
							autoFocus
							style={{ height: "150px" }}
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
						<Form.Control
							as="textarea"
							placeholder="Traduccion"
							style={{ height: "150px" }}
						/>
					</Stack>
				</Col>
			</Row>
		</Container>
	);
}
export default App;
