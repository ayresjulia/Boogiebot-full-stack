import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";

it("renders without crashing", () => {
	render(
		<MemoryRouter>
			<NavBar />
		</MemoryRouter>
	);
});

it("matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<NavBar />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it("shows login link and onclick shows the login form", () => {
	const { getByText } = render(
		<MemoryRouter>
			<NavBar />
		</MemoryRouter>
	);

	const login = getByText("Log In");
	expect(login).toBeInTheDocument();

	render(<LoginForm />);
	fireEvent.click(login);
	const username = getByText("Username");
	expect(username).toBeInTheDocument();
});

it("shows signup link and onclick shows the signup form", () => {
	const { getByText } = render(
		<MemoryRouter>
			<NavBar />
		</MemoryRouter>
	);

	const login = getByText("Sign Up");
	expect(login).toBeInTheDocument();

	render(<SignupForm />);
	fireEvent.click(login);
	const username = getByText("First Name");
	expect(username).toBeInTheDocument();
});
