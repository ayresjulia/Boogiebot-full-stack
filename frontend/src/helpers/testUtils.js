import React from "react";
import UserContext from "./UserContext";

const demoUser = {
	username: "testuser",
	firstName: "testfirst",
	lastName: "testlast",
	email: "test@test.net",
	imgUrl: null
};

const UserProvider = ({ children, currentUser = demoUser }) => (
	<UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
);

export { UserProvider };
