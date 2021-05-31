import React from "react";
import { Image } from "react-bootstrap";
import "./Home.css";
import staticMsg from "./helpers/staticUserMsg";

/** Home page. If user is logged in, welcomes them by username and profile picture. */

const Home = ({ currentUser }) => {
	return (
		<div>
			<div className="Home">
				<div className="Home-body">
					{currentUser && (
						<div>
							{staticMsg.HOME_WELCOME_USER}
							<b>{currentUser.username}</b>{" "}
							{currentUser.profileUrl !== "" && (
								<Image
									className="Profile-url"
									src={currentUser.profileUrl}
									alt="homepage-img"
								/>
							)}
							{currentUser.profileUrl === "" && (
								<Image
									className="Profile-url"
									src={staticMsg.USER_DEFAULT_URL}
									alt="homepage-img"
								/>
							)}
						</div>
					)}
					{!currentUser && <p>{staticMsg.NON_USER_MSG}</p>}
				</div>
				<div className="Home-img">
					<Image className="img1" fluid src={staticMsg.HOME_IMG1} alt="homepage-img" />
					<Image className="img2" fluid src={staticMsg.HOME_IMG2} alt="homepage-img" />
					<Image className="img3" fluid src={staticMsg.HOME_IMG3} alt="homepage-img" />
					<Image className="img4" fluid src={staticMsg.HOME_IMG4} alt="homepage-img" />
				</div>
			</div>
		</div>
	);
};

export default Home;
