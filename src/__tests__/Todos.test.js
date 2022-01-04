import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Todos from '../components/Todos';
import axios from 'axios';
import * as service from '../services/fetchData.js';

jest.mock('axios');

describe('Todos', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  test('Present data', () => {
    const mockObj = (idx) => ({
      userId: idx,
      id: idx,
      title: 'delectus aut autem',
      completed: false,
    });

    const expectedTodos = [...Array(2).keys()].map((i) => mockObj(i + 1));
    const mockData = {
      data: expectedTodos,
      status: 200,
    };
    axios.get.mockResolvedValueOnce(mockData);

    jest.spyOn(service, 'fetchData');

    act(() => {
      render(<Todos />);
    });

    const table = screen.getByTestId('todo-table');
    expect(table).toMatchSnapshot();

    expect(service.fetchData).toHaveBeenCalledTimes(1);
  });
});
