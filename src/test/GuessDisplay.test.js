// GuessDisplay.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GuessDisplay from '../components/GuessDisplay';

const mockSong = {
  title: "Test Song",
  lyrics: "hello world this is a test",
};

describe('GuessDisplay', () => {
  test('renders title and input', () => {
    render(<GuessDisplay currentSong={mockSong} />);
    
    expect(screen.getByText(/test song/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your guess/i)).toBeInTheDocument();
  });

  test('handles correct guesses', () => {
    render(<GuessDisplay currentSong={mockSong} />);
    
    const input = screen.getByPlaceholderText(/enter your guess/i);
    
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(screen.getByText('hello')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'world' } });
    expect(screen.getByText('world')).toBeInTheDocument();
  });

  test('shows score correctly', () => {
    render(<GuessDisplay currentSong={mockSong} />);
    
    const input = screen.getByPlaceholderText(/enter your guess/i);
    
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.change(input, { target: { value: 'world' } });

    expect(screen.getByText('2 / 6')).toBeInTheDocument();
  });

  test('restart button resets guesses', () => {
    render(<GuessDisplay currentSong={mockSong} />);
    
    const input = screen.getByPlaceholderText(/enter your guess/i);
    fireEvent.change(input, { target: { value: 'hello' } });

    const restartButton = screen.getByText(/restart/i);
    fireEvent.click(restartButton);

    expect(screen.queryByText('hello')).not.toBeInTheDocument();
  });

  test('quit button reveals all lyrics', () => {
    render(<GuessDisplay currentSong={mockSong} />);
    
    const quitButton = screen.getByText(/quit/i);
    fireEvent.click(quitButton);

    ['hello', 'world', 'this', 'is', 'a', 'test'].forEach(word => {
      expect(screen.getByText(word)).toBeInTheDocument();
    });
  });
});
