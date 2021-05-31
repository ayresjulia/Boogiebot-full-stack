"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
	authenticateJWT,
	ensureLoggedIn,
	ensureAdmin,
	ensureCorrectUserOrAdmin
} = require("./auth");
// const Event = require("../models/event");

const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign({ username: "test", isAdmin: false }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test", isAdmin: false }, "wrong");

describe("authenticate jsonwebtoken for user", function () {
	test("works when passed through header", function () {
		expect.assertions(2);
		const req = { headers: { authorization: `Bearer ${testJwt}` } };
		const res = { locals: {} };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({
			user: {
				iat: expect.any(Number),
				username: "test",
				isAdmin: false
			}
		});
	});

	test("works when is not passed through header", function () {
		expect.assertions(2);
		const req = {};
		const res = { locals: {} };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({});
	});

	test("works when invalid token passed", function () {
		expect.assertions(2);
		const req = { headers: { authorization: `Bearer ${badJwt}` } };
		const res = { locals: {} };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({});
	});
});

describe("ensure Logged In function", function () {
	test("works for regular user credentials", function () {
		expect.assertions(1);
		const req = {};
		const res = { locals: { user: { username: "test", is_admin: false } } };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		ensureLoggedIn(req, res, next);
	});

	test("returns unauthorized for no information passed", function () {
		expect.assertions(1);
		const req = {};
		const res = { locals: {} };
		const next = function (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureLoggedIn(req, res, next);
	});
});

describe("ensure user is admin", function () {
	test("works when admin is true", function () {
		expect.assertions(1);
		const req = {};
		const res = { locals: { user: { username: "test", isAdmin: true } } };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		ensureAdmin(req, res, next);
	});

	test("unauthorized if user is not admin", function () {
		expect.assertions(1);
		const req = {};
		const res = { locals: { user: { username: "test", isAdmin: false } } };
		const next = function (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureAdmin(req, res, next);
	});

	test("unauthorized if user is not logged in", function () {
		expect.assertions(1);
		const req = {};
		const res = { locals: {} };
		const next = function (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureAdmin(req, res, next);
	});
});

describe("ensureCorrectUserOrAdmin", function () {
	test("works if the user is admin", function () {
		expect.assertions(1);
		const req = { params: { username: "test" } };
		const res = { locals: { user: { username: "admin", isAdmin: true } } };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		ensureCorrectUserOrAdmin(req, res, next);
	});

	test("works if user is current user", function () {
		expect.assertions(1);
		const req = { params: { username: "test" } };
		const res = { locals: { user: { username: "test", isAdmin: false } } };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		ensureCorrectUserOrAdmin(req, res, next);
	});

	test("unauthorized when username doesn't match", function () {
		expect.assertions(1);
		const req = { params: { username: "wrong" } };
		const res = { locals: { user: { username: "test", isAdmin: false } } };
		const next = function (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureCorrectUserOrAdmin(req, res, next);
	});

	test("unauthorized when no user is logged in", function () {
		expect.assertions(1);
		const req = { params: { username: "test" } };
		const res = { locals: {} };
		const next = function (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureCorrectUserOrAdmin(req, res, next);
	});
});
