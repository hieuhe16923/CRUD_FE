import React, { useState } from "react";

const TodoList = () => {
	const [todos, setTodos] = useState([
		{ id: 1, text: "Learn React" },
		{ id: 2, text: "Learn TypeScript" },
	]);

	// State for the input field value
	const [inputValue, setInputValue] = useState("");

	// State to track which item is being edited
	const [editingId, setEditingId] = useState(null);

	// State for the text of the item being edited
	const [editText, setEditText] = useState("");

	// Handler for adding a new todo
	const handleAddTodo = () => {
		// Prevent adding empty todos
		if (inputValue.trim() === "") return;

		const newTodo = {
			id: Date.now(), // Simple unique ID
			text: inputValue.trim(),
		};

		setTodos([...todos, newTodo]);
		setInputValue(""); // Clear the input field
	};

	// Handler for deleting a todo
	const handleDeleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	// Handler to start the editing process
	const handleStartEdit = (todo) => {
		setEditingId(todo.id);
		setEditText(todo.text); // Pre-fill the edit input with the current text
	};

	// Handler for saving an edited todo
	const handleSaveEdit = (id) => {
		if (editText.trim() === "") {
			// If the edit text is empty, just delete the todo
			handleDeleteTodo(id);
			return;
		}

		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, text: editText.trim() } : todo
		);

		setTodos(updatedTodos);
		setEditingId(null); // Exit editing mode
		setEditText("");
	};

	return (
		<div className="max-w-md p-4 mx-auto mt-10 bg-white rounded-lg shadow-lg">
			<h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
				My Todo List
			</h2>

			{/* Input form for adding new todos */}
			<div className="flex gap-2 mb-6 ">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleAddTodo();
					}}
					placeholder="Add a new todo"
					className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					onClick={handleAddTodo}
					className="px-6 py-3 text-white transition duration-200 ease-in-out bg-blue-600 rounded-md hover:bg-blue-700"
				>
					Add Todo
				</button>
			</div>

			{/* List of todos */}
			<ul className="p-0 list-none">
				{todos.map((todo) => (
					<li
						key={todo.id}
						className="flex items-center justify-between p-4 mb-3 border border-gray-200 rounded-md shadow-sm bg-gray-50"
					>
						{editingId === todo.id ? (
							// Editing view
							<>
								<input
									type="text"
									value={editText}
									onChange={(e) => setEditText(e.target.value)}
									className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
								/>
								<button
									onClick={() => handleSaveEdit(todo.id)}
									className="px-4 py-2 ml-3 text-white transition duration-200 ease-in-out bg-green-600 rounded-md hover:bg-green-700"
								>
									Save
								</button>
							</>
						) : (
							// Default display view
							<>
								<span className="m-2 max-w-[200px] text-lg text-gray-700">
									{todo.text}
								</span>
								<div>
									<button
										onClick={() => handleStartEdit(todo)}
										className="px-4 py-2 mr-2 text-white transition duration-200 ease-in-out bg-yellow-500 rounded-md hover:bg-yellow-600"
									>
										Edit
									</button>
									<button
										onClick={() => handleDeleteTodo(todo.id)}
										className="px-4 py-2 text-white transition duration-200 ease-in-out bg-red-600 rounded-md hover:bg-red-700"
									>
										Delete
									</button>
								</div>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
