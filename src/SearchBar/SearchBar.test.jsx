import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';


test("When searchbar is clicked, the event is sent", async () => {
    const mockHandleInput = jest.fn();
    const user = userEvent.setup();
    render(<SearchBar onUserInput={mockHandleInput} />);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(mockHandleInput).toHaveBeenCalledWith("");
})


test("When user inputs something, input is on screen", async () => {
    const mockHandleInput = jest.fn();
    render(<SearchBar onUserInput={mockHandleInput} />);
    const input = screen.getByPlaceholderText("Search a song");
    const value = "Entered Text";
    fireEvent.change(input, {
        target: {
            value
        }
    })
    expect(input).toHaveValue("Entered Text");
})

test("When user inputs something, input is sent", async () => {
    const mockHandleInput = jest.fn();
    const user = userEvent.setup();
    render(<SearchBar onUserInput={mockHandleInput} />);
    const input = screen.getByPlaceholderText("Search a song");
    const value = "Entered Text";
    fireEvent.change(input, {
        target: {
            value
        }
    })
    const button = screen.getByRole("button");
    await user.click(button);
    expect(mockHandleInput).toHaveBeenCalledWith("Entered Text");
})