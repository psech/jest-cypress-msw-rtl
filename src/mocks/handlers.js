import { rest } from 'msw';

const loremIpsum = [
  'Culpa reprehenderit commodo nostrud ad aliquip tempor ipsum eiusmod deserunt dolor.',
  'Laborum eiusmod dolore magna reprehenderit ad.',
  'Consectetur incididunt occaecat tempor ex dolor.',
  'Irure irure enim officia minim esse nulla culpa ea deserunt reprehenderit veniam ullamco magna.',
  'Voluptate nisi sint enim aute.',
  'Sunt laborum incididunt commodo id deserunt aliqua id non ullamco.',
  'Excepteur laboris qui ut consequat commodo nulla cupidatat laborum enim pariatur dolore ipsum sint pariatur.',
  'Fugiat aliqua mollit aliqua nulla ea labore duis aliqua deserunt pariatur amet minim voluptate eiusmod.',
  'Enim magna Lorem excepteur cillum exercitation et officia enim ut deserunt pariatur.',
  'Mollit dolor in deserunt incididunt adipisicing consequat aute adipisicing nostrud esse Lorem.',
  'Deserunt excepteur dolor culpa aliquip dolore ullamco cupidatat voluptate sunt.',
  'Enim quis nulla cupidatat nulla.',
  'Laborum aute nisi pariatur in fugiat fugiat duis eiusmod eu nostrud esse laborum incididunt.',
  'Labore commodo enim quis quis adipisicing veniam ea mollit non culpa est ea minim veniam.',
  'Deserunt id velit qui est ipsum qui quis elit nisi aliqua consectetur culpa.',
  'Reprehenderit duis magna anim qui eiusmod duis non cupidatat excepteur.',
  'Ut sit voluptate pariatur occaecat officia reprehenderit anim dolore voluptate ut nisi deserunt.',
  'Deserunt voluptate commodo exercitation est exercitation id nisi reprehenderit quis duis velit duis Lorem aliquip.',
  'Ad occaecat sint commodo cillum sunt consectetur ut velit aute eu irure cillum et.',
  'Anim sunt do quis excepteur commodo dolore ea aliquip incididunt.',
];

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
    const mockObj = (idx) => ({
      userId: idx,
      id: idx,
      title: loremIpsum[idx % loremIpsum.length],
      completed: idx % 2 === 0,
    });

    const expectedTodos = [...Array(20).keys()].map((i) => mockObj(i + 1));

    return res(ctx.status(200), ctx.json(expectedTodos));
  }),
];
