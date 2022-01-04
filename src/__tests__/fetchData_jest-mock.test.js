import axios from 'axios';
import { BASE_URL, fetchData } from '../services/fetchData';

jest.mock('axios');

const mockObj = (idx) => ({
  userId: idx,
  id: idx,
  title: 'delectus aut autem',
  completed: false,
});

describe('fetchData', () => {
  describe('when API call is successful', () => {
    test('should return a list of todos', async () => {
      // given
      const expectedTodos = [...Array(2).keys()].map((i) => mockObj(i + 1));
      const mockData = {
        data: expectedTodos,
        status: 200,
      };
      axios.get.mockResolvedValueOnce(mockData);

      // when
      const result = await fetchData();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/todos`);
      expect(result).toEqual(expectedTodos);
    });
  });

  describe('when API call fails', () => {
    test('should return an empty array', async () => {
      // arrange
      axios.get.mockRejectedValueOnce(new Error());

      // act
      const result = await fetchData();

      // assert
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/todos`);
      expect(result).toEqual([]);
    });
  });
});
