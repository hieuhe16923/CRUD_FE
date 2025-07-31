import { createSlice } from "@reduxjs/toolkit";

export interface TodoState {
	id: number | string;
	text: string;
}

const initialState: TodoState[] = [
	{ id: 1, text: "Learn React" },
	{ id: 2, text: "Learn TypeScript" },
];
export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.push(action.payload);
		},
		deleteTodo: (state, action) => {
			console.log(action.payload);
			return state.filter((todo) => todo.id !== action.payload);
		},
		editTodo: (state, action) => {
			return state.map((todo) =>
				todo.id === action.payload.id
					? { ...todo, text: action.payload.text }
					: todo
			);
		},
	},
});
export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
