import { render } from "@testing-library/react";
import React from "react";
import EditEventForm from "./EditEventForm";
import { useParams, MemoryRouter } from "react-router-dom";
import { EventProvider } from "../helpers/testUtils";

const userInfo = {
	username: "testuser",
	isAdmin: false
};
describe("<EditEventForm.js />", () => {
	it("can tell mocked from unmocked functions", () => {
		expect(jest.isMockFunction(useParams)).toBe(true);
		expect(jest.isMockFunction(MemoryRouter)).toBe(false);
	});
});

it("renders without crashing", async () => {
	useParams.mockReturnValue({ id: 1 });
	render(
		<MemoryRouter>
			<EventProvider>
				<EditEventForm currentUser={userInfo} />
			</EventProvider>
		</MemoryRouter>
	);
});

it("matches snapshot", async () => {
	useParams.mockReturnValue({ id: 1 });
	const { asFragment } = render(
		<MemoryRouter>
			<EventProvider>
				<EditEventForm currentUser={userInfo} />
			</EventProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it("renders a field in the form", async () => {
	useParams.mockReturnValue({ id: 1 });
	const { getByText } = render(
		<MemoryRouter>
			<EventProvider>
				<EditEventForm currentUser={userInfo} />
			</EventProvider>
		</MemoryRouter>
	);
	expect(getByText("Edit Anniversary")).toBeInTheDocument();
});
