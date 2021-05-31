import React from "react";
import { render } from "@testing-library/react";
import Events from "./Events";
import { MemoryRouter } from "react-router";

let testEvents = [
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
let currentUser = { username: "testuser", isAdmin: false };

beforeAll(() => {
	currentUser;
});
beforeEach(() => {
	testEvents;
});

afterEach(() => {
	testEvents = [];
});

it("renders without crashing", () => {
	render(
		<MemoryRouter>
			<Events currentUser={currentUser} events={testEvents} />
		</MemoryRouter>
	);
});

it("matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<Events currentUser={currentUser} events={testEvents} />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it("renders create new event link", () => {
	const { getByText } = render(
		<MemoryRouter>
			<Events currentUser={currentUser} events={testEvents} />
		</MemoryRouter>
	);

	expect(getByText("your events will be shown here.", { exact: false })).toBeInTheDocument();
	expect(getByText("create").parentNode.href).toBe("http://localhost/events/new");
});
