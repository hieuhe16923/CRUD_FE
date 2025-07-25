import React, { useState, useEffect } from "react";

const ValidatedInput = ({ label, errorMessage, type = "text" }) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState(false);

	useEffect(() => {
		const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		const validatePassword = (password) => {
			// Minimum 6 characters, at least one uppercase, one lowercase, one number, one special character
			const passwordRegex =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
			return passwordRegex.test(password);
		};

		if (value !== "") {
			let isValid = true;
			if (type === "email") {
				isValid = validateEmail(value);
			} else if (type === "password") {
				isValid = validatePassword(value);
			}
			setError(!isValid);
		} else {
			setError(false); // Do not show error on initial empty input
		}
	}, [value, type]);

	return (
		<>
			<div className="flex items-center justify-end ">
				<label htmlFor={label} className="p-5 text-start ">
					{label}
				</label>
				<input
					id={label}
					className="  w-full  p-2 max-w-[400px] bg-gray-100 border border-gray-300 rounded "
					type={type === "password" ? "password" : "email"}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					style={{ borderColor: error ? "red" : undefined }}
				/>
			</div>
			{error && (
				<span className="w-[500px] text-red-500 text-center">
					{errorMessage}
				</span>
			)}
		</>
	);
};

export default ValidatedInput;
