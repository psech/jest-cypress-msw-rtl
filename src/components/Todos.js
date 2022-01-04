import './Todos.css';
import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/fetchData.js';
import Todo from './Todo';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState({ isError: false, message: null });

  const getSetData = async () => {
    const data = await fetchData();
    setTodos(data);

    if (data.length === 0) {
      setError({ isError: true, message: 'Something went wrong. 🤷🏻‍♂️' });
    }
  };

  useEffect(() => {
    getSetData();
  }, []);

  const handleChange = (id) =>
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  const handleRefresh = () => window.location.reload(false);

  return (
    <>
      <h3>Todos</h3>
      <button onClick={handleRefresh}>Refresh</button>
      <table data-testid="todo-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Todo</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {error.isError ? (
            <tr>
              <td colspan="3" style={{ color: 'red' }}>
                {error.message}
              </td>
            </tr>
          ) : (
            todos.map((todo) => (
              <Todo key={todo.id} todo={todo} onChange={handleChange} />
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
