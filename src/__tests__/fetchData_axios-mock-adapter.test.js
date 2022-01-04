import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BASE_URL, fetchData } from '../services/fetchData';

const mockObj = (idx) => ({
  userId: idx,
  id: idx,
  title: 'delectus aut autem',
  completed: false,
});

describe('fetchData', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('when API call is successful', () => {
    test('should return a list of todos', async () => {
      // given
      const expectedTodos = [...Array(2).keys()].map((i) => mockObj(i + 1));

      mock.onGet(`${BASE_URL}/todos`).reply(200, expectedTodos);

      // when
      const result = await fetchData();

      // then
      expect(mock.history.get[0].url).toEqual(`${BASE_URL}/todos`);
      expect(result).toEqual(expectedTodos);
    });
  });

  describe('when API call fails', () => {
    test('should return an empty array', async () => {
      // arrange
      mock.onGet(`${BASE_URL}/todos`).networkErrorOnce();

      // act
      const result = await fetchData();

      // assert
      expect(mock.history.get[0].url).toEqual(`${BASE_URL}/todos`);
      expect(result).toEqual([]);
    });
  });
});
