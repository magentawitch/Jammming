import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Tracklist from './Tracklist';


describe("Tracklist component", () => {
    const mockOnTrackClick = jest.fn();
    const testTracks = [
      { name: "Song 1", artist: "Artist 1", album: "Album 1", uri: "uri1" },
      { name: "Song 2", artist: "Artist 2", album: "Album 2", uri: "uri2" },
    ];
    const testIcon = "+";

    afterEach(() => {
        jest.clearAllMocks();
      });

    test("Renders withouth clashing", () => {
        render(<Tracklist icon={testIcon} trackArray={testTracks} onTrackClick={mockOnTrackClick} />);
    });

    test("Renders the correct numeber of track components", () => {
        //When
        render(<Tracklist icon={testIcon} trackArray={testTracks} onTrackClick={mockOnTrackClick} />);
        //Then
        expect(screen.getAllByText(/Song/i).length).toBe(testTracks.length)
    });

    test("Calls onTrackClick when Track is clicked", async () => {
        //Given
        const user = userEvent.setup();
        //When
        render(<Tracklist icon={testIcon} trackArray={testTracks} onTrackClick={mockOnTrackClick} />);
        const buttons = await screen.findAllByRole("button");
        await user.click(buttons[0]);
        //Then
        expect(mockOnTrackClick).toHaveBeenCalledWith(testTracks[0], 0);
    });
})
