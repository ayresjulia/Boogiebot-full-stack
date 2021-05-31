import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./EventForm.css";
import staticMsg from "../helpers/staticUserMsg";
import states from "../helpers/states";
import countries from "../helpers/countries";
import { v4 as uuid } from "uuid";
// import EventContext from "../helpers/EventContext";

/** Form to add new event and save event to db. */

const EventForm = ({ currentUser, newEvent }) => {
	const history = useHistory();
	const [ formErrors, setFormErrors ] = useState([]);
	const [ formData, setFormData ] = useState({
		title: "",
		description: "",
		eventDate: "",
		eventTime: "",
		city: "",
		state: "",
		country: "",
		imgUrl: staticMsg.DEFAULT_EVENT_IMG,
		hostUsername: currentUser.username
	});

	/** On submit, redirect to events page "/events". */

	async function handleSubmit (e) {
		e.preventDefault();

		let result = await newEvent(formData);
		if (result.success) {
			history.push("/events");
		} else {
			setFormErrors(result.errors);
			console.error(formErrors);
		}
	}

	function handleChange (e) {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	}

	return (
		<div className="EventForm">
			<div className="EventForm-left">
				<span className="big-bold">{staticMsg.FORM_TIP}</span>
				<p>{staticMsg.EVENT_FORM_TIP_DESC}</p>
			</div>
			<div className="EventForm-right">
				<Form className="Form-body" onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="title" />
						<Input
							id="title"
							name="title"
							className="Form-input"
							value={formData.title}
							placeholder="title"
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="description" />
						<Input
							id="description"
							name="description"
							className="Form-input"
							value={formData.description}
							placeholder="description"
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<Row>
						<Col md={6}>
							<FormGroup className="form-row">
								<Label htmlFor="eventDate" />
								<Input
									id="eventDate"
									type="date"
									name="eventDate"
									className="Form-input"
									value={formData.eventDate}
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="eventTime" />
								<Input
									id="eventTime"
									type="time"
									name="eventTime"
									className="Form-input"
									value={formData.eventTime}
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="city" />
								<Input
									id="city"
									name="city"
									className="Form-input"
									value={formData.city}
									placeholder="city"
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup>
								<Label htmlFor="state" />
								<Input
									type="select"
									id="state"
									name="state"
									value={formData.state}
									onChange={handleChange}>
									<option>state</option>
									{states.map((state) => <option key={uuid()}>{state}</option>)}
								</Input>
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label htmlFor="country" />
								<Input
									type="select"
									id="country"
									name="country"
									value={formData.country}
									className="Form-input"
									onChange={handleChange}>
									<option>country</option>
									{countries.map((country) => (
										<option key={uuid()}>{country}</option>
									))}
								</Input>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label htmlFor="hostUsername" />
						<Input
							id="hostUsername"
							name="hostUsername"
							className="Form-input"
							value={formData.hostUsername}
							placeholder="your username"
							onChange={handleChange}
							required
						/>
					</FormGroup>

					<Button className="btn btn-success float-right" onSubmit={handleSubmit}>
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default EventForm;
