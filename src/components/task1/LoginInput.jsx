import React from "react";
import ValidatedInput from "./ValidateInput";

const LoginInput = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
			<div className="p-8 bg-white rounded shadow-md w-[600px]">
				<h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
				<div className="flex flex-col gap-4 mb-10 ">
					<ValidatedInput
						label="Email "
						errorMessage="Email must be a valid email address."
						type="email"
					/>
					<ValidatedInput
						label="Password"
						errorMessage="Password must be at least 6 characters long, contain one uppercase, one lowercase, one number, and one special character."
						type="password"
					/>
				</div>

				{/* <a href="/">
					{" "}
					<button className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
						Login
					</button>
				</a> */}
			</div>
		</div>
	);
};

export default LoginInput;
