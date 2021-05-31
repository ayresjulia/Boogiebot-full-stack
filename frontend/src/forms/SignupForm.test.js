import { render } from "@testing-library/react";
import React from "react";
import SignupForm from "./SignupForm";

test("it renders without crashing", () => {
	render(<SignupForm />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<SignupForm />);
	expect(asFragment()).toMatchSnapshot();
});

it("renders a field in the form", () => {
	const { getByText } = render(<SignupForm />);
	expect(getByText("First Name")).toBeInTheDocument();
});
