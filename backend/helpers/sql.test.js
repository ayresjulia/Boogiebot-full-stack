const { sqlForPartialUpdate } = require("./sql");

describe("syntax change from JSX to SQL", () => {
	test("changes to sql syntax when passing single item", function () {
		const result = sqlForPartialUpdate({ f1: "v1" }, { f1: "f1", fF2: "f2" });
		expect(result).toEqual({
			setCols: '"f1"=$1',
			values: [ "v1" ]
		});
	});

	test("changes to sql syntax when passing 2 items", () => {
		const result = sqlForPartialUpdate({ f1: "v1", jsF2: "v2" }, { jsF2: "f2" });
		expect(result).toEqual({
			setCols: '"f1"=$1, "f2"=$2',
			values: [ "v1", "v2" ]
		});
	});
});