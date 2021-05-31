import { render } from "@testing-library/react";
import React from "react";
import LoginForm from "./LoginForm";

test("it renders without crashing", () => {
	render(<LoginForm />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<LoginForm />);
	expect(asFragment()).toMatchSnapshot();
});

it("renders a field in the form", () => {
	const { getByText } = render(<LoginForm />);
	expect(getByText("Username")).toBeInTheDocument();
});
