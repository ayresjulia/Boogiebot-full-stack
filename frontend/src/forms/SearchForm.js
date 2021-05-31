import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./SearchForm.css";

/** Search form to filter out picture and restaurants in Inspiration and Catering components. */

const SearchForm = ({ searchFor }) => {
	const [ search, setSearch ] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		searchFor(search.trim() || undefined);
		setSearch(search.trim());
	};

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<div className="SearchForm">
			<Form className="form-inline" onSubmit={handleSubmit}>
				<FormGroup>
					<Label htmlFor="search" />
					<Input
						className="form-control flex-grow-1 search-input"
						name="search"
						placeholder="Enter search term.."
						value={search}
						onChange={handleChange}
					/>
					<Button
						type="submit"
						data-testid="submit-btn"
						className="Searchform-btn"
						color="primary">
						Submit
					</Button>
				</FormGroup>
			</Form>
		</div>
	);
};

export default SearchForm;
