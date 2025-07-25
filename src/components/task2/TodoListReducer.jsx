import React, { useReducer, useState } from "react";

const todoReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TODO":
			return [
				...state,
				{ id: Date.now(), text: action.payload, completed: false },
			];
		case "TOGGLE_TODO":
			return state.map((todo) =>
				todo.id === action.payload
					? { ...todo, completed: !todo.completed }
					: todo
			);
		case "DELETE_TODO":
			return state.filter((todo) => todo.id !== action.payload);
		default:
			return state;
	}
};

const TodoListReducer = () => {
	const [todos, dispatch] = useReducer(todoReducer, []);
	const [newTodoText, setNewTodoText] = useState("");

	const handleAddTodo = () => {
		if (newTodoText.trim() === "") return;
		dispatch({ type: "ADD_TODO", payload: newTodoText });
		setNewTodoText("");
	};

	return (
		<div>
			<h1>Todo List</h1>
			<div>
				<input
					type="text"
					value={newTodoText}
					onChange={(e) => setNewTodoText(e.target.value)}
					placeholder="Add a new todo"
				/>
				<button onClick={handleAddTodo}>Add Todo</button>
			</div>
			<ul>
				{todos.map((todo) => (
					<li
						key={todo.id}
						style={{ textDecoration: todo.completed ? "line-through" : "none" }}
					>
						{todo.text}
						<button
							onClick={() =>
								dispatch({ type: "TOGGLE_TODO", payload: todo.id })
							}
						>
							Toggle
						</button>
						<button
							onClick={() =>
								dispatch({ type: "DELETE_TODO", payload: todo.id })
							}
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoListReducer;
