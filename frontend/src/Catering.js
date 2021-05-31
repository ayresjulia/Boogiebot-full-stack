import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
	Card,
	CardTitle,
	CardSubtitle,
	Button,
	CardImg,
	CardBody,
	Container,
	Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col
} from "reactstrap";

import "./Catering.css";
import SearchForm from "./forms/SearchForm";
import { CLIENT_KEY_DOCUMENU } from "./secret";
import staticMsg from "./helpers/staticUserMsg";
import EventContext from "./helpers/EventContext";

const DOCUMENU_API_URL = "https://api.documenu.com/v2/restaurants/search/fields";

const Catering = ({ currentUser, saveToMoodboard }) => {
	const { events } = useContext(EventContext);
	const [ restaurants, setRestaurants ] = useState([]);
	const [ checkedId, setCheckedId ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ restInfo, setRestInfo ] = useState({
		event_id: checkedId,
		inspiration_url: null,
		restaurant_name: "",
		restaurant_address: ""
	});
	const [ formErrors, setFormErrors ] = useState([]);

	useEffect(() => {
		let mounted = true;
		getRestaurants().then(() => {
			if (mounted) {
				setLoading(false);
			}
		});
		return function cleanup () {
			mounted = false;
		};
	}, []);

	async function getRestaurants (zip) {
		let getRestaurant = await axios.get(
			`${DOCUMENU_API_URL}?zip_code=${zip}&key=${CLIENT_KEY_DOCUMENU}`
		);

		let data = getRestaurant.data.data;
		setRestaurants(data);
	}

	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	const getEventId = (e) => {
		if (e.target.checked) {
			setCheckedId(e.target.value);
		}
	};

	const getRestaurantInfo = (e) => {
		let restName = e.target.parentNode.querySelector(".restName").innerText;
		let restAddr = e.target.parentNode.querySelector(".restAddr").innerText;
		setRestInfo({
			event_id: checkedId,
			restaurant_name: restName,
			restaurant_address: restAddr
		});
	};

	async function handleSubmit (e) {
		e.preventDefault();
		setFormErrors([]);

		let result = await saveToMoodboard(restInfo);
		if (!result.success) {
			setFormErrors(result.errors);
			console.error(formErrors);
			alert(staticMsg.EVENT_ALERT);
		}
	}

	if (!events) return console.error(staticMsg.CONSOLE_EVENTS_ERROR);
	if (!currentUser.username) return console.error(staticMsg.CONSOLE_USER_ERROR);

	return (
		<div>
			<div className="Catering-form">
				<div className="Catering-new">
					<span className="Catering-bold">{staticMsg.CATERING_LOOKUP}</span>
					<p className="Catering-p">{staticMsg.CATERING_INFO}</p>
					<p className="Catering-small">{staticMsg.CATERING_FOOTNOTE}</p>
				</div>
				<SearchForm searchFor={getRestaurants} />
			</div>
			<div>
				<Form className="form-inline" onSubmit={handleSubmit}>
					<div className="Catering-row">
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
					<Container className="Catering-cards">
						<Row xs="1" sm="2" md="3">
							{!loading &&
								restaurants.map((item) => (
									<Col key={item.restaurant_id}>
										<Card
											key={item.restaurant_id}
											id={item.restaurant_id}
											className="Catering-card">
											<CardImg
												top
												className="Catering-card-img"
												width="100%"
												src={staticMsg.CATERING_DEFAULT}
												alt="restaurant image"
											/>
											<CardBody>
												<CardTitle tag="h5" className="restName">
													{item.restaurant_name}
												</CardTitle>
												{item.cuisines.length > 1 && (
													<CardSubtitle
														tag="h6"
														className="mb2 text-muted">
														Cuisine: {item.cuisines[0]}
													</CardSubtitle>
												)}
												{item.address && (
													<p>
														<a
															href={`http://maps.google.com/?q=${item
																.address["formatted"]}`}
															target="_blank"
															rel="noreferrer"
															tag="h6"
															className="mb2 text-muted restAddr">
															{item.address["formatted"]}
														</a>
													</p>
												)}
												{item.restaurant_phone && (
													<p>
														<a
															href={`tel:${item.restaurant_phone}`}
															tag="h6"
															className="mb2 text-muted">
															{item.restaurant_phone}
														</a>
													</p>
												)}
												{item.restaurant_website && (
													<p>
														<a
															href={item.restaurant_website}
															target="_blank"
															rel="noreferrer"
															tag="h6"
															className="mb2 text-muted">
															{staticMsg.CATERING_WEB}
														</a>
													</p>
												)}
											</CardBody>

											<Button
												type="submit"
												className="Catering-btn btn-secondary"
												onClick={getRestaurantInfo}>
												Save!
											</Button>
										</Card>
									</Col>
								))}
						</Row>
					</Container>
				</Form>
			</div>
		</div>
	);
};

export default Catering;
