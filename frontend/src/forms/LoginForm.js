import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../helpers/Alert";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./LoginForm.css";
import staticMsg from "../helpers/staticUserMsg";

/** Form to login a user and show homepage at "/" . */

const LoginForm = ({ login }) => {
	const history = useHistory();
	const formDataRef = useRef();
	const [ formData, setFormData ] = useState({
		username: "",
		password: ""
	});
	const [ formErrors, setFormErrors ] = useState([]);
	const [ formSuccess, setFormSuccess ] = useState(false);

	useEffect(() => {
		formDataRef.current = {
			username: "",
			password: ""
		};
		return () => (formDataRef.current = {});
	});

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			let result = await login(formData);
			if (result.success) {
				history.push("/");
				setFormSuccess(true);
			} else {
				setFormErrors(result.errors);
			}
		},
		[ formData, history, login ]
	);

	function handleChange (e) {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	}

	return (
		<div className="LoginForm">
			<Form className="Form-body" onSubmit={handleSubmit}>
				<FormGroup>
					<Label htmlFor="username">{staticMsg.FORM_USERNAME}</Label>
					<Input
						id="username"
						name="username"
						className="Form-input"
						value={formData.username}
						onChange={handleChange}
						autoComplete="username"
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
						autoComplete="current-password"
						required
					/>
				</FormGroup>

				{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
				{formSuccess ? <Alert type="success" messages={[ "Success!" ]} /> : null}

				<Button className="btn btn-success float-right" onSubmit={handleSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default LoginForm;
