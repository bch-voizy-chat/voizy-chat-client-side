import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Header />
				<Main />
				<Footer />
			</AuthProvider>
		</Router>
	);
}

export default App;
