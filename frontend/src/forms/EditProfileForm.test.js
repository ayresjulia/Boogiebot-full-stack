import { render } from "@testing-library/react";
import React from "react";
import EditProfileForm from "./EditProfileForm";
import { UserProvider } from "../helpers/testUtils";

test("it renders without crashing", () => {
	render(
		<UserProvider>
			<EditProfileForm />
		</UserProvider>
	);
});

it("matches snapshot", () => {
	const { asFragment } = render(
		<UserProvider>
			<EditProfileForm />
		</UserProvider>
	);
	expect(asFragment()).toMatchSnapshot();
});

it("renders a field in the form", () => {
	const { getByText } = render(
		<UserProvider>
			<EditProfileForm />
		</UserProvider>
	);
	expect(getByText("Confirm password to make changes")).toBeInTheDocument();
});
