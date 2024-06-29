import React, { useEffect, useState, createContext } from "react";
import Home from "./Pages/Home/Home";
import { Route, Routes, useNavigate, Router } from "react-router-dom";
import Question from "./Pages/Question/Question";
import Layout from "./Pages/Layout/Layout";
import Answer from "./Pages/Answer/Answer";
import LoginSignup from "./Pages/LoginSignUp/LoginSignup";
// import Layout from "./Pages/Layout/Layout";
import axios from "./axiosConfig";
export const Appstate = createContext();
function App() {
	const [user, setuser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	async function chekuser() {
		try {
			const { data } = await axios.get("/users/check", {
				headers: { authorization: "Bearer " + token },
			});
			setuser(data);
			setIsLoggedIn(true);
		} catch (error) {
			navigate("/");
			setIsLoggedIn(false);
		}
	}
	useEffect(() => {
		chekuser();
	}, [token]);
	async function handleLogout() {
		try {
			// Clear user data and token from local storage
			setuser({});
			localStorage.removeItem("token");
			setIsLoggedIn(false);
			navigate("/");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	}

	return (
		<Appstate.Provider value={{ user, setuser, isLoggedIn, handleLogout }}>
			{/* Header Layout */}
			<Layout>
				<Routes>
					<Route path="/" element={<LoginSignup />} />
					<Route path="/askquestion" element={<Question />} />
					<Route path="/home" element={<Home />} />
					<Route path="/answer/:questionId" element={<Answer />} />
				</Routes>
			</Layout>
		</Appstate.Provider>
	);
}

export default App;
