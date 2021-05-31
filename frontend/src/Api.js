import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class. Static class tying together methods used to get/send to the API. */

class BoogieBotApi {
	// the token to interact with the API is stored here.
	static token;

	static async request (endpoint, data = {}, method = "get") {
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${BoogieBotApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.log("err", err);
			let message = err.response.data.error.message;

			throw Array.isArray(message) ? message : [ message ];
		}
	}

	/** Get all events and single event filtered by id. */

	static async getEvents () {
		let res = await this.request("events");
		return res.events;
	}

	static async getEvent (id) {
		let res = await this.request(`events/${id}`);
		return res.event;
	}

	/** Save new event data to db. */

	static async newEvent (data) {
		await this.request(`events/new`, data, "post");
	}

	/** Delete event data to db. */

	static async removeEvent (id) {
		let res = await this.request(`events/${id}/delete`, {}, "delete");
		return res.event;
	}
	/** Save event data to moodboard. */

	static async saveToMoodboard (data) {
		let res = await this.request(`events/moodboard/new`, data, "post");
		return res.event;
	}

	/** Edit event data and save to db. */

	static async editEvent (id, data) {
		let res = await this.request(`events/${id}/edit`, data, "patch");
		return res.event;
	}

	/** Get current user */

	static async getCurrentUser (username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	/** Get token for login from username, password. */

	static async login (data) {
		let res = await this.request(`auth/token`, data, "post");
		return res.token;
	}

	/** Signup for site. */

	static async signup (data) {
		let res = await this.request(`auth/register`, data, "post");
		return res.token;
	}

	/** Save user profile page. */

	static async saveProfile (username, data) {
		let res = await this.request(`users/${username}`, data, "patch");
		return res.user;
	}
}

export default BoogieBotApi;
