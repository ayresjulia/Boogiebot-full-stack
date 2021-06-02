import React from "react";
import { render } from "@testing-library/react";
import Events from "./Events";
import { MemoryRouter } from "react-router";
import { EventProvider } from "./helpers/testUtils";

let currentUser = { username: "testuser", isAdmin: false };

it("renders without crashing", () => {
	render(
		<MemoryRouter>
			<EventProvider>
				<Events currentUser={currentUser} />
			</EventProvider>
		</MemoryRouter>
	);
});

it("matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<EventProvider>
				<Events currentUser={currentUser} />
			</EventProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it("renders create new event link", () => {
	const { getByText } = render(
		<MemoryRouter>
			<EventProvider>
				<Events currentUser={currentUser} />
			</EventProvider>
		</MemoryRouter>
	);

	expect(getByText("your events will be shown here.", { exact: false })).toBeInTheDocument();
	expect(getByText("create").parentNode.href).toBe("http://localhost/events/new");
});
