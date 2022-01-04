/* eslint-disable */
/// <reference types="cypress" />
/* eslint-enable */

import { BASE_URL } from '../../src/services/fetchData';

describe('E2E Cypress tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('My first test', () => {
    it('hello world', () => {
      cy.findByText(/pizza/i).should('be.visible');
    });
  });

  describe('User action tests', () => {
    it('show input', () => {
      const expectedText = 'some text';

      cy.findByPlaceholderText('type something here...').should('not.exist');
      cy.findByRole('button', { name: /show input/i })
        .should('be.visible')
        .click();
      cy.findByPlaceholderText('type something here...')
        .should('be.visible')
        .type(expectedText);
      cy.findByText(expectedText).should('be.visible');
    });
  });

  describe('API test', () => {
    it('with MSW', () => {
      cy.window().then((window) => {
        const { worker, rest } = window.msw;
        worker.use(
          rest.get(`${BASE_URL}/todos`, (req, res, ctx) => {
            return res.once(ctx.status(500));
          })
        );
      });

      cy.log('Todo list is not available due to internal server error.');
      cy.findByText(/Something went wrong./i).should('be.visible');
    });

    /*
      To run this test stop all active npm tasks and run the following
      1. npm run build && serve -s build, note npm i -g serve is required
      2. npm run cypress
      It is to prevent MSW from intercepting requests and use Cypress with production code
    */
    it.skip('with Cypress', () => {
      cy.intercept(`${BASE_URL}/todos`, (req) => {
        req.continue((res) => {
          res.send({ statusCode: 500 });
        });
      }).as('GetTodos');

      // The visit() is duplicated from beforeEach, but it's needed
      // as intercept must be registered before navigating.
      cy.visit('/');

      cy.log('Todo list is not available due to internal server error.');
      cy.findByText(/Something went wrong./i).should('be.visible');
    });
  });
});
