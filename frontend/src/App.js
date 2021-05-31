import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import "./App.css";
import NavBar from "./navbar-routes/NavBar";
import Routes from "./navbar-routes/Routes";
import BoogieBotApi from "./Api";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./helpers/UserContext";

/** Key name for storing token in localStorage. */
export const TOKEN_STORAGE_ID = "boogiebot-token";

/** BoogieBot App.
 *
 * - infoLoaded: making sure user data has been pulled out from API.
 *
 * - currentUser: user obj from API. 
 *
 * - token: for logged in users, this is their authentication JWT, stored in localStorage.
 */

const App = () => {
	const [ infoLoaded, setInfoLoaded ] = useState(false);
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ events, setEvents ] = useState([]);
	const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);
	/** Load user info from API. Until a user is logged in and they have a token, this should not run. It only needs to re-run when a user logs out, so the value of the token is a dependency for this effect. */

	useEffect(
		function loadUserInfo () {
			async function getCurrentUser () {
				if (token) {
					try {
						let { username } = jwt.decode(token);
						BoogieBotApi.token = token;
						let currentUser = await BoogieBotApi.getCurrentUser(username);
						setCurrentUser(currentUser);
					} catch (err) {
						console.error("App loadUserInfo: problem loading", err);
						setCurrentUser(null);
					}
				}
				setInfoLoaded(true);
			}
			setInfoLoaded(false);
			getCurrentUser();
		},
		[ token ]
	);

	/** Handles user login. */

	async function login (loginData) {
		try {
			let token = await BoogieBotApi.login(loginData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			console.error("login failed", errors);
			return { success: false, errors };
		}
	}

	/** Handles user signup. */

	async function signup (signupData) {
		try {
			let token = await BoogieBotApi.signup(signupData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			console.error("signup failed", errors);
			return { success: false, errors };
		}
	}

	/** Handles user logout. */

	const logout = () => {
		setCurrentUser(null);
		setToken(null);
	};

	/** Add new event to db. */

	async function newEvent (data) {
		try {
			let newEvent = await BoogieBotApi.newEvent(data);
			setEvents({ ...events, ...newEvent });
			return { success: true };
		} catch (errors) {
			console.error("adding new event failed", errors);
			return { success: false, errors };
		}
	}

	/** Add event data to moodboard. */

	async function saveToMoodboard (data) {
		try {
			await BoogieBotApi.saveToMoodboard(data);
			return { success: true };
		} catch (errors) {
			console.error("saving to moodboard failed", errors);
			return { success: false, errors };
		}
	}
	return (
		<div className="App">
			<BrowserRouter>
				<UserContext.Provider value={{ currentUser, setCurrentUser }}>
					<NavBar currentUser={currentUser} logout={logout} />
					<Routes
						login={login}
						signup={signup}
						logout={logout}
						newEvent={newEvent}
						currentUser={currentUser}
						saveToMoodboard={saveToMoodboard}
					/>
					{!infoLoaded && <Redirect to="/" />}
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	);
};

export default App;
