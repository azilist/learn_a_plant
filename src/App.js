import "./styles/App.css";
import Footer from "./components/Footer";
import Plants from "./components/Plants.js";
import "./styles/Plants.css";

function App() {
	return (
		<div className="App">
			<div>
				<Plants />
			</div>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}

export default App;
