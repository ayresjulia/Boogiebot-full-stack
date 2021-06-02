import React from "react";
import { render } from "@testing-library/react";
import MyEvent from "./MyEvent";
import { useParams, MemoryRouter } from "react-router-dom";
import { EventProvider } from "./helpers/testUtils";

let currentUser = { username: "testuser", isAdmin: false };

describe("<EditEventForm.js />", () => {
	it("can tell mocked from unmocked functions", () => {
		expect(jest.isMockFunction(useParams)).toBe(true);
		expect(jest.isMockFunction(MemoryRouter)).toBe(false);
	});
});

it("renders without crashing", () => {
	useParams.mockReturnValue({ id: 1 });
	render(
		<MemoryRouter>
			<EventProvider>
				<MyEvent currentUser={currentUser} />
			</EventProvider>
		</MemoryRouter>
	);
});

it("shows page default text", () => {
	useParams.mockReturnValue({ id: 2 });
	const { getByText } = render(
		<MemoryRouter>
			<EventProvider>
				<MyEvent currentUser={currentUser} />
			</EventProvider>
		</MemoryRouter>
	);
	expect(getByText("browse restaurants in Catering tab to save them here")).toBeInTheDocument();
});
