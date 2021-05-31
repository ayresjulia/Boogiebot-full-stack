import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import BoogieBotApi from "./Api";
import "./Inspiration.css";
import SearchForm from "./forms/SearchForm";
import staticMsg from "./helpers/staticUserMsg";
import { CLIENT_ID_UNSPLASH } from "./secret";
import EventContext from "./helpers/EventContext";

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

const Inspiration = ({ currentUser, saveToMoodboard }) => {
	const { events, setEvents } = useContext(EventContext);
	const [ pictures, setPictures ] = useState([]);
	const [ checkedId, setCheckedId ] = useState(null);
	const [ inspUrl, setInspUrl ] = useState(null);
	const [ formErrors, setFormErrors ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const getPictures = async (query) => {
		try {
			let pics = await axios.get(
				`${UNSPLASH_API_URL}?client_id=${CLIENT_ID_UNSPLASH}&query=${query}&orientation=squarish&per_page=100`
			);
			let data = pics.data.results;
			setPictures(data);
			setLoading(false);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(
		() => {
			const getEvents = async () => {
				let events = await BoogieBotApi.getEvents();
				setEvents(events);
			};

			getEvents();
			getPictures();
		},
		[ setEvents ]
	);

	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	let getEventId = (e) => {
		if (e.target.checked) {
			setCheckedId(e.target.value);
		}
	};

	let getInspImageUrl = (e) => {
		setInspUrl(e.target.src);
	};

	async function handleSubmit (e) {
		e.preventDefault();
		setFormErrors([]);

		let result = await saveToMoodboard({
			event_id: parseInt(checkedId),
			inspiration_url: inspUrl,
			restaurant_key: null
		});

		if (!result.success) {
			setFormErrors(result.errors);
			console.error(formErrors);
			alert("Please choose an event first.");
		}
	}

	if (!events) return console.error(staticMsg.CONSOLE_EVENTS_ERROR);
	if (!currentUser.username) return console.error(staticMsg.CONSOLE_USER_ERROR);

	return (
		<div>
			<div className="Inspiration-form">
				<div className="Inspiration-new">
					<span className="bold">{staticMsg.INSPIRATION_ADD}</span>
					<p className="Inspiration-p">{staticMsg.INSPIRATION_INFO}</p>
					<p className="small-text">{staticMsg.INSPIRATION_FOOTNOTE}</p>
				</div>
				<SearchForm searchFor={getPictures} />
			</div>
			<div>
				<Form className="form-inline" onSubmit={handleSubmit}>
					<div className="Inspiration-row">
						<Row>
							{filteredEvents &&
								filteredEvents.map((event) => (
									<Col key={event.id}>
										<FormGroup check>
											<Label check>
												<Input
													type="checkbox"
													value={event.id}
													onClick={getEventId}
												/>{" "}
												{event.title}
											</Label>
										</FormGroup>
									</Col>
								))}
						</Row>
					</div>
					<div className="Inspiration-imgs" data-testid="insp-img">
						<Row xs="1" sm="2" md="4">
							{!loading &&
								pictures.map((item) => (
									<Col key={item.id}>
										<Button type="submit" className="Insp-btn">
											<Image
												className="Inspiration-rounded"
												onClick={getInspImageUrl}
												value={item.urls.regular}
												fluid
												src={item.urls.regular}
											/>
										</Button>
									</Col>
								))}
						</Row>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Inspiration;
