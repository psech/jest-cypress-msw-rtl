import React from 'react';

export default function Todo({ todo, onChange }) {
  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>
        <input
          type="checkbox"
          defaultChecked={todo.completed}
          onChange={() => onChange(todo.id)}
        />
      </td>
    </tr>
  );
}
