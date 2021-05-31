import React from "react";
/** Alert is custom component to show bootstrap-style alerts. */

const Alert = ({ type = "danger", messages = [] }) => {
	return (
		<div className={`alert alert-${type}`} role="alert">
			{messages &&
				messages.map((error) => (
					<p className="mb-0 small" key={error}>
						{error}
					</p>
				))}
		</div>
	);
};

export default Alert;
