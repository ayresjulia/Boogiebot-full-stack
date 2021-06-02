import React from "react";
import UserContext from "./UserContext";
import EventContext from "./EventContext";

const demoUser = {
	username: "testuser",
	firstName: "testfirst",
	lastName: "testlast",
	email: "test@test.net",
	imgUrl: null
};

const testEvents = [
	{
		id: 1,
		title: "Anniversary",
		description: "Anniversary",
		eventDate: "2021-05-19",
		eventTime: "13:00",
		city: "Minsk",
		state: "CA",
		country: "Belarus",
		imgUrl:
			"https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		hostUsername: "testuser"
	},
	{
		id: 2,
		title: "Wedding",
		description: "Wedding",
		eventDate: "2021-05-19",
		eventTime: "13:00",
		city: "Minsk",
		state: "CA",
		country: "Belarus",
		imgUrl:
			"https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		hostUsername: "testuser"
	}
];

const UserProvider = ({ children, currentUser = demoUser }) => (
	<UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
);

const EventProvider = ({ children, events = testEvents }) => (
	<EventContext.Provider value={{ events }}>{children}</EventContext.Provider>
);

export { UserProvider, EventProvider };
