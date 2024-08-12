import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders header hext', () => {
  render(<App />);
  const headerElement = screen.getByText(/X is playing/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders button reset', () => {
  const resetBoard = jest.fn();

  render(
    <App />
  );

  const resetButton = screen.getByRole('button', { name: /reset the game/i })
  fireEvent.click(resetButton);
  expect(resetBoard).toHaveBeenCalled;
});

test('renders all cells', () => {
  render(<App />);
  const cells = screen.getAllByRole('gridcell');
  expect(cells).toHaveLength(9);
});

test('move with X', () =>{
  render(<App />);
  const cells = screen.getAllByRole('gridcell');
  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent('X');
});

test('render victory combination', ()=>{
  render (<App/>);
  const cells = screen.getAllByRole("gridcell");
  fireEvent.click(cells[0]);
  fireEvent.click(cells[1]);
  fireEvent.click(cells[3]);
  fireEvent.click(cells[4]);
  fireEvent.click(cells[6]);

  const winMessage = screen.getByText(/It is a Victory for X/i);
  expect(winMessage).toBeInTheDocument();
});