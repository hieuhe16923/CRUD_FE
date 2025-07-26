import React, { useState } from 'react';
import { Todo } from '../../Types/Todo';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue.trim(), isEditing: false },
    ]);
    setInputValue('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id: number) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, isEditing: true } : todo))
    );
  };

  const handleSave = (id: number, newText: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Todo List</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a todo..."
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            {todo.isEditing ? (
              <input
                defaultValue={todo.text}
                className="flex-1 border border-gray-300 px-2 py-1 rounded mr-2"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSave(todo.id, (e.target as HTMLInputElement).value);
                  }
                }}
              />
            ) : (
              <span className="flex-1">{todo.text}</span>
            )}

            <div className="flex gap-2 ml-2 items-center justify-center">
              {todo.isEditing ? (
                <button
                  onClick={() =>
                    handleSave(
                      todo.id,
                      (
                        document.querySelector(
                          `input[value="${todo.text}"]`
                        ) as HTMLInputElement
                      )?.value || todo.text
                    )
                  }
                  className="hover:underline"
                >
                  <svg
                    className="w-5 h-5 text-emerald-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id)}
                  className="text-blue-600 hover:underline"
                >
                  <svg
                    className="w-5 h-5 text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                </button>
              )}
              <button onClick={() => handleDelete(todo.id)}>
                <svg
                  className="w-5 h-5 text-red-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
