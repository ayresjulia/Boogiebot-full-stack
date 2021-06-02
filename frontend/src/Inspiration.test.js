import React from "react";
import Inspiration from "./Inspiration";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { EventProvider } from "./helpers/testUtils";

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

const currentUser = { username: "testuser", isAdmin: false };

describe("component renders with elements on the page", () => {
	it("shows search button on the page and initial text", () => {
		act(() => {
			ReactDOM.render(
				<EventProvider>
					<Inspiration currentUser={currentUser} />
				</EventProvider>,
				container
			);
		});
		let btn = container.querySelector("button");
		expect(btn).toBeInTheDocument();
		let add = container.querySelector(".bold");
		expect(add).toBeInTheDocument();
	});
});
