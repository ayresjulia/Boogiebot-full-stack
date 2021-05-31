import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import BoogieBotApi from "../Api";
import Events from "../Events";
import EventForm from "../forms/EventForm";
import Home from "../Home";
import MyEvent from "../MyEvent";
import Inspiration from "../Inspiration";
import Catering from "../Catering";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import EditProfileForm from "../forms/EditProfileForm";
import staticMsg from "../helpers/staticUserMsg";
import EditEventForm from "../forms/EditEventForm";
import EventContext from "../helpers/EventContext";

/** Main Routes, some are protected and only accessible to logged in users. 
 * If user is not logged in, page redirects to homepage and asks to log in or sign up.
*/

const Routes = ({ login, signup, currentUser, newEvent, saveToMoodboard }) => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ events, setEvents ] = useState([]);

	useEffect(() => {
		getEvents();
	}, []);

	async function getEvents () {
		let events = await BoogieBotApi.getEvents();
		setEvents(events);
		setIsLoading(false);
	}

	if (isLoading) {
		return <div>{staticMsg.LOADING}</div>;
	}

	return (
		<EventContext.Provider value={{ events, setEvents }}>
			<Switch>
				<Route exact path="/">
					<Home currentUser={currentUser} />
				</Route>

				<Route exact path="/login">
					<LoginForm login={login} />
				</Route>
				<Route exact path="/signup">
					<SignupForm signup={signup} />
				</Route>
				{currentUser && (
					<Route exact path="/events/new">
						<EventForm newEvent={newEvent} currentUser={currentUser} />
					</Route>
				)}

				{currentUser && (
					<Route exact path="/events/:id/edit">
						<EditEventForm currentUser={currentUser} />
					</Route>
				)}
				{currentUser && (
					<Route exact path="/events/:id">
						<MyEvent cantFind="/events" />
					</Route>
				)}

				{currentUser && (
					<Route exact path="/events">
						<Events currentUser={currentUser} />
					</Route>
				)}
				{currentUser && (
					<Route exact path="/inspiration">
						<Inspiration currentUser={currentUser} saveToMoodboard={saveToMoodboard} />
					</Route>
				)}
				{currentUser && (
					<Route exact path="/catering">
						<Catering currentUser={currentUser} saveToMoodboard={saveToMoodboard} />
					</Route>
				)}
				{currentUser && (
					<Route exact path="/profile">
						<EditProfileForm />
					</Route>
				)}

				<Redirect to="/" />
			</Switch>
		</EventContext.Provider>
	);
};

export default Routes;
