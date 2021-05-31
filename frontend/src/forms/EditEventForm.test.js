import { render } from "@testing-library/react";
import React from "react";
import EditEventForm from "./EditEventForm";
import { useParams, MemoryRouter } from "react-router-dom";

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
			<EditEventForm currentUser={userInfo} events={testEvents} />
		</MemoryRouter>
	);
});

it("matches snapshot", async () => {
	useParams.mockReturnValue({ id: 1 });
	const { asFragment } = render(
		<MemoryRouter>
			<EditEventForm currentUser={userInfo} events={testEvents} />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it("renders a field in the form", async () => {
	useParams.mockReturnValue({ id: 1 });
	const { getByText } = render(
		<MemoryRouter>
			<EditEventForm currentUser={userInfo} events={testEvents} />
		</MemoryRouter>
	);
	expect(getByText("Edit Anniversary")).toBeInTheDocument();
});
