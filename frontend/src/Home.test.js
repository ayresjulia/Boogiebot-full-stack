import { render } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router";

it("renders without crashing", () => {
	render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
});

it("matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it("shows welcome text", () => {
	const { getByText } = render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
	expect(getByText("Please, Log in or Sign up to begin.")).toBeInTheDocument();
});

it("shows welcome text for logged in user", () => {
	let username = "testuser";
	const { getByText } = render(
		<MemoryRouter>
			<Home currentUser={username} />
		</MemoryRouter>
	);
	expect(getByText("Welcome", { exact: false })).toBeInTheDocument();
});
