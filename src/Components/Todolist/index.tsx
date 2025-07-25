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
      <h2 className="text-xl font-semibold mb-4">Todo List</h2>
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

            <div className="flex gap-2 ml-2">
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
                  className="text-green-600 hover:underline"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
