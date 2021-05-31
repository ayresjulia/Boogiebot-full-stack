import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Image, Row, Col } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import BoogieBotApi from "./Api";
import "./MyEvent.css";
import staticMsg from "./helpers/staticUserMsg";
import EventContext from "./helpers/EventContext";

const MAPS_BASE_URL = "http://maps.google.com/";

const SearchEvent = () => {
	const { id } = useParams();
	const [ evtMoodboard, setEvtMoodboard ] = useState([]);
	const { events } = useContext(EventContext);

	let event = events.find((evt) => parseInt(evt.id) === parseInt(id));

	useEffect(
		() => {
			async function getEvent () {
				let moodboard = await BoogieBotApi.getEvent(event.id);
				setEvtMoodboard(moodboard);
			}
			getEvent();
		},
		[ event.id ]
	);

	if (!events) return console.error(staticMsg.CONSOLE_EVENTS_ERROR);

	return (
		<div>
			<p className="MyEvent-rmrk">
				<i>{staticMsg.MY_EVENT_RMRK1}</i>
			</p>
			<Row>
				<Col m={6}>
					<div className="mb-left">
						{evtMoodboard.moodboard &&
							evtMoodboard.moodboard.map(
								(item) =>
									item.inspirationUrl && (
										<Image
											key={uuid()}
											className="mb-insp"
											fluid
											src={item.inspirationUrl}
										/>
									)
							)}
					</div>
				</Col>
				<Col m={6}>
					<div className="mb-right">
						<Card className="Event-card">
							<CardBody>
								<CardTitle className="font-weight-bold text-center mb-card-title">
									{event.title}
									<Link to={`/events/${event.id}/edit`}>
										<FontAwesomeIcon className="icon" icon={faEdit} />
									</Link>
								</CardTitle>

								<p>
									<b>{staticMsg.MY_EVENT_DESC}</b> {event.description}
								</p>
								<p>
									<b>{staticMsg.MY_EVENT_WHEN}</b> {event.eventDate}
								</p>
								<p>
									<b>{staticMsg.MY_EVENT_TIME}</b> {event.eventTime}
								</p>
								<p>
									<b>{staticMsg.MY_EVENT_LOCATION}</b> {event.city} |{" "}
									{event.state} | {event.country}
								</p>
								<CardTitle className="font-weight-bold text-center mb-catering-title">
									{staticMsg.MY_EVENT_CAT}
								</CardTitle>
								<i>{staticMsg.MY_EVENT_RMRK2}</i>
								<ol>
									{evtMoodboard.moodboard &&
										evtMoodboard.moodboard.map(
											(item) =>
												item.restaurantName && (
													<div key={uuid()}>
														<li>
															<Card className="Cat-card">
																<CardTitle>
																	{item.restaurantName}
																</CardTitle>

																<CardSubtitle>
																	<a
																		target="_blank"
																		rel="noreferrer"
																		href={`${MAPS_BASE_URL}?q=${item.restaurantAddress}`}>
																		{item.restaurantAddress}
																	</a>
																</CardSubtitle>
															</Card>
														</li>
													</div>
												)
										)}
								</ol>
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default SearchEvent;
