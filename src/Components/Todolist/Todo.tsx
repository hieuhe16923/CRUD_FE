import React, { useState } from 'react';
import { Todo } from '../../Types/Todo';
import EditIcon from './Icons/EditIcon';
import SaveIcon from './Icons/SaveIcon';
import DeleteIcon from './Icons/DeleteIcon';

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (confirmed) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
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
      <h2 className="text-xl font-semibold mb-4 text-center">My Todo List</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a todo..."
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          value={inputValue}
          onKeyDown={handleKeyDown}
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
                  <SaveIcon />
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id)}
                  className="text-blue-600 hover:underline"
                >
                  <EditIcon />
                </button>
              )}
              <button onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
