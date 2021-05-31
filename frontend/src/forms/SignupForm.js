import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../helpers/Alert";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Image } from "react-bootstrap";
import "./SignupForm.css";
import staticMsg from "../helpers/staticUserMsg";

/** Form to signup a user and save user to db. */

const SignupForm = ({ signup }) => {
	const history = useHistory();
	const formDataRef = useRef();
	const [ formData, setFormData ] = useState({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: "",
		profileUrl: staticMsg.USER_DEFAULT_URL
	});
	const [ formErrors, setFormErrors ] = useState([]);
	const [ formSuccess, setFormSuccess ] = useState(false);

	useEffect(() => {
		formDataRef.current = {
			username: "",
			password: "",
			firstName: "",
			lastName: "",
			email: "",
			profileUrl: staticMsg.USER_DEFAULT_URL
		};
		return () => (formDataRef.current = {});
	});

	/** On submit, redirect to homepage "/". */

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			let result = await signup(formData);
			if (result.success) {
				history.push("/");
				setFormSuccess(true);
			} else {
				setFormErrors(result.errors);
			}
		},
		[ formData, signup, history ]
	);

	function handleChange (e) {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	}

	return (
		<div className="SignupForm">
			<Form className="Form-body" onSubmit={handleSubmit}>
				<Image
					className="Profile-url"
					src={staticMsg.USER_DEFAULT_URL}
					alt="user-profile"
				/>

				<FormGroup>
					<Label htmlFor="username">{staticMsg.FORM_USERNAME}</Label>
					<Input
						id="username"
						name="username"
						className="Form-input"
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</FormGroup>

				<FormGroup>
					<Label htmlFor="password">{staticMsg.FORM_PWD}</Label>
					<Input
						id="password"
						type="password"
						name="password"
						className="Form-input"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="firstName">{staticMsg.FORM_FIRST_NAME}</Label>
					<Input
						id="firstName"
						type="text"
						name="firstName"
						className="Form-input"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="lastName">{staticMsg.FORM_LAST_NAME}</Label>
					<Input
						id="lastName"
						type="text"
						name="lastName"
						className="Form-input"
						value={formData.lastName}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="email">{staticMsg.FORM_EMAIL}</Label>
					<Input
						id="email"
						type="email"
						name="email"
						className="Form-input"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
				{formSuccess ? (
					<Alert type="success" messages={[ "Updated successfully." ]} />
				) : null}
				<Button className="btn btn-success float-right" onSubmit={handleSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default SignupForm;
