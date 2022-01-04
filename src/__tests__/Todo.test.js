import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from '../components/Todo';

describe('Todo', () => {
  test('Should match snapshot', () => {
    const todo = {
      userId: 10,
      id: 10,
      title: 'some title',
      completed: false,
    };

    const handleChange = jest.fn();

    const { container } = render(
      <Todo key={todo.id} todo={todo} onChange={handleChange} />
    );

    const row = container.querySelector('tr');
    expect(row).toMatchSnapshot();
  });

  test('Handle select checkbox', () => {
    const todo = {
      userId: 10,
      id: 10,
      title: 'some title',
      completed: false,
    };

    const handleChange = jest.fn();

    const { container } = render(
      <Todo key={todo.id} todo={todo} onChange={handleChange} />
    );

    userEvent.click(container.querySelector('input'));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
