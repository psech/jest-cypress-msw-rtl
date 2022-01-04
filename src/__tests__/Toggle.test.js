import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggle from '../components/Toggle';

test('button can toggle', () => {
  render(<Toggle />);

  expect(screen.getByText('Show input')).toBeInTheDocument();
  expect(screen.queryByText('Hide input')).not.toBeInTheDocument();

  userEvent.click(screen.getByText('Show input'));

  expect(screen.queryByText('Show input')).not.toBeInTheDocument();
  expect(screen.getByText('Hide input')).toBeInTheDocument();
});

test('button shows input', () => {
  render(<Toggle />);
  expect(screen.queryByLabelText('input-field')).not.toBeInTheDocument();

  userEvent.click(screen.getByText('Show input'));
  expect(screen.queryByLabelText('input-field')).toBeInTheDocument();
});

test('input retypes to span', () => {
  const text = 'Some sample text';

  render(<Toggle />);
  userEvent.click(screen.getByText('Show input'));

  userEvent.type(screen.getByLabelText('input-field'), text);
  expect(screen.getByText(text)).toBeInTheDocument();
});

test('button resets text', () => {
  const text = 'Some sample text';

  render(<Toggle />);
  userEvent.click(screen.getByText('Show input'));

  userEvent.type(screen.getByLabelText('input-field'), text);
  expect(screen.getByText(text)).toBeInTheDocument();

  userEvent.click(screen.getByText('Hide input'));
  userEvent.click(screen.getByText('Show input'));

  expect(screen.getByLabelText('copied text')).toBeEmptyDOMElement();
});
