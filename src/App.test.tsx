import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders canvas element', () => {
  render(<App />);
  const canvasElement = screen.getByTestId("game-screen");
  expect(canvasElement).toBeInTheDocument();
});
