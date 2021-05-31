import React from "react";
import { render } from "@testing-library/react";
import Inspiration from "./Inspiration";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { getPictures } from "./Inspiration";

jest.mock("./Inspiration");

const testEvents = [
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
const currentUser = { username: "testuser", isAdmin: false };

it("renders without crashing", async () => {
	act(() => {
		render(
			<MemoryRouter>
				<Inspiration events={testEvents} currentUser={currentUser} />
			</MemoryRouter>
		);
	});
	expect(screen.getByText("Loading...")).toBeInTheDocument();
	expect(getPictures).toHaveBeenCalledTimes(1);
});

// 1 fail - Inspiration(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.

it("shows text on the page", async () => {
	await act(async () => {
		const { getByText } = render(
			<MemoryRouter>
				<Inspiration events={testEvents} currentUser={currentUser} />
			</MemoryRouter>
		);
		await waitFor(() => expect(getByText("add")).toBeInTheDocument());
	});
});

// 2 passed -    Warning: An update to Inspiration inside a test was not wrapped in act(...).

// When testing, code that causes React state updates should be wrapped into act(...):

// act(() => {
//   /* fire events that update state */
// });
// /* assert on the output */

// This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
//     at Inspiration (/Users/jayres/Desktop/BoogieBot/frontend/src/Inspiration.js:37:3)
//     at Router (/Users/jayres/Desktop/BoogieBot/frontend/node_modules/react-router/cjs/react-router.js:99:30)
//     at MemoryRouter (/Users/jayres/Desktop/BoogieBot/frontend/node_modules/react-router/cjs/react-router.js:187:35)

//   60 | 	};
//   61 |
// > 62 | 	async function handleSubmit (e) {
//      | 	     ^
//   63 | 		e.preventDefault();
//   64 | 		setFormErrors([]);
//   65 |

//   at printWarning (node_modules/react-dom/cjs/react-dom.development.js:67:30)
//   at error (node_modules/react-dom/cjs/react-dom.development.js:43:5)
//   at warnIfNotCurrentlyActingUpdatesInDEV (node_modules/react-dom/cjs/react-dom.development.js:24064:9)
//   at dispatchAction (node_modules/react-dom/cjs/react-dom.development.js:16135:9)
//   at getPictures (src/Inspiration.js:62:7)
