import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Track from './Track';

describe("Track Component", () => {
    const mockTrack = {
        name: "Test Song",
        artist: "Test Artist",
        album: "Test Album",
    };
    const mockOnClick = jest.fn();
    const testIcon = "+";

    test("Calls onTrackClick when button is clicked", async () => {
        //Given
        const user = userEvent.setup();
        render(<Track track={mockTrack} icon={testIcon} onTrackClick={mockOnClick} />);
        const iconButton = screen.getByRole("button");
        //When
        await user.click(iconButton);
        //Then
        expect(mockOnClick).toHaveBeenCalled();
    });

    test("Renders track information correctly", () => {
        //When
        render(<Track track={mockTrack} icon={testIcon} onTrackClick={mockOnClick} />);
        //Then
        expect(screen.getByText("Test Song")).toBeInTheDocument();
        expect(screen.getByText("Test Artist | Test Album")).toBeInTheDocument();
 
    });

    test("Renders the correct icon in the button", () => {
        //When
        render(<Track track={mockTrack} icon={testIcon} onTrackClick={mockOnClick} />);
        //Then
        expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    });
})



