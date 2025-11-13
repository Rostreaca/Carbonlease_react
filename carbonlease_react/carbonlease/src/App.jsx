import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import { GlobalCommonStyles } from './styles/global.styled';

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
		<GlobalCommonStyles />
		<Header/>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		<Footer/>
		</>
	)
}

export default App
