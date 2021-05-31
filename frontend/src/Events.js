import React, { useContext, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Events.css";
import staticMsg from "./helpers/staticUserMsg";
import BoogieBotApi from "./Api";
import EventContext from "./helpers/EventContext";

const Events = ({ currentUser }) => {
	const history = useHistory();
	const { events, setEvents } = useContext(EventContext);

	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	const removeEvent = async (e) => {
		let btn = e.target.parentNode;
		let evtId = btn.id;

		try {
			await BoogieBotApi.removeEvent(evtId);
			let closestCard = btn.parentNode;
			closestCard.remove();
			history.push("/events");
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
		},
		[ setEvents ]
	);

	if (!events) return console.error(staticMsg.CONSOLE_EVENTS_ERROR);
	if (!currentUser.username) return console.error(staticMsg.CONSOLE_USER_ERROR);

	return (
		<div className="Events">
			<p className="Events-rmrk">
				<i>{staticMsg.EVENTS_RMRK}</i>
			</p>

			<div className="Events-body">
				<div className="Events-create">
					<Link to="/events/new" className="Events-new">
						<span className="big-bold">{staticMsg.EVENTS_CREATE}</span>
						<p>
							<i>{staticMsg.EVENTS_NEW}</i>
						</p>
					</Link>
				</div>

				<div className="Events-current">
					{filteredEvents &&
						filteredEvents.map((event) => (
							<div key={event.id}>
								<Link to={`/events/${event.id}`} key={event.id} className="link">
									<Card className="evt">
										<CardImg
											className="evt-img"
											top
											width="100%"
											src={event.imgUrl || staticMsg.DEFAULT_EVENT_IMG}
											alt="Card image cap"
										/>
										<CardBody>
											<CardTitle tag="h5">{event.title}</CardTitle>
										</CardBody>
									</Card>
								</Link>
								<div id={event.id}>
									<Button onClick={removeEvent}>Delete</Button>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Events;
