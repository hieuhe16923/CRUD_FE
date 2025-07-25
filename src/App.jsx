import React from "react";
import TodoList from "./components/task2/TodoList";
import LoginInput from "./components/task1/LoginInput";
import { Route, Routes } from "react-router-dom";
import TodoListReducer from "./components/task2/TodoListReducer";

function App() {
	return (
		<div className="grid ">
			<LoginInput></LoginInput>
			{/* <TodoList /> */}
			{/* <TodoListReducer></TodoListReducer> */}
		</div>
	);
}

export default App;
