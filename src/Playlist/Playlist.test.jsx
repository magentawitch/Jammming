import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Playlist from './Playlist';


describe("Playlist component", () => {
    const mockSavePlaylist = jest.fn();
    const mockRemoveTrack = jest.fn();
    const user = userEvent.setup();
    const testTracks = [
        { name: "Song 1", artist: "Artist 1", album: "Album 1", uri: "uri1" },
        { name: "Song 2", artist: "Artist 2", album: "Album 2", uri: "uri2" }]

    test("When user inputs Title, Title is shown on screen", async () => {
        //Given
        render(<Playlist playlist={testTracks} onRemoveTrack={mockRemoveTrack} onSavePlaylist={mockSavePlaylist} activeTab={"playlistTab"} isSmallScreen={false} />);
        const input = screen.getByPlaceholderText("Unnamed Playlist");
        const value = "Entered Title"
        //When
        fireEvent.change(input, {
            target: {
                value
            }
        })
        //Then
        expect(input).toHaveValue("Entered Title");

    });

    test("Calls onRemoveTrack when the removeButton is clicked", async () => {
        //Given
        render(<Playlist icon="-" playlist={testTracks} onRemoveTrack={mockRemoveTrack} onSavePlaylist={mockSavePlaylist} activeTab={"playlistTab"} isSmallScreen={false} />);
        const buttons = screen.getAllByRole("button", { name: "-" });
        //When
        await user.click(buttons[0]);
        //Then
        expect(mockRemoveTrack).toHaveBeenCalledWith(0);
    })

    test("Calls onSavePlaylist when the 'Save to Spotify' button is clicked with valid playlist", async () => {
        //Given
        render(<Playlist playlist={testTracks} onRemoveTrack={mockRemoveTrack} onSavePlaylist={mockSavePlaylist} activeTab={"playlistTab"} isSmallScreen={false} />);
        const saveButton = screen.getByRole("button", { name: "SAVE TO SPOTIFY" });
        const input = screen.getByPlaceholderText("Unnamed Playlist");
        const value = "Entered Title"
        fireEvent.change(input, {
            target: {
                value
            }
        })
        //When
        await user.click(saveButton);
        //Then
        expect(mockSavePlaylist).toHaveBeenCalled();
    });

    test("After an user saves a playlist, the playlist and title are empty", async () => {
        //Given
        render(<Playlist playlist={testTracks} onRemoveTrack={mockRemoveTrack} onSavePlaylist={mockSavePlaylist} activeTab={"playlistTab"} isSmallScreen={false} />);
        const saveButton = screen.getByRole("button", { name: "SAVE TO SPOTIFY" });
        const input = screen.getByPlaceholderText("Unnamed Playlist");
        fireEvent.change(input, {
            target: { value: "Entered Title" }
        });
        const testPlaylist = screen.queryAllByText("Song");
        //When
        await user.click(saveButton);
        //Then
        expect(input.value).toBe("");
        expect(testPlaylist.length).toBe(0);

    });

    test("If the screen is Small and the Playlist tab is inactive, the component should have a 'hide' style applied to it", () => {
        //When
        render(<Playlist playlist={testTracks} onRemoveTrack={mockRemoveTrack} onSavePlaylist={mockSavePlaylist} activeTab={"otherTab"} isSmallScreen={true} />);
        //Then
        const container = screen.queryByText("Song");
        expect(container).not.toBeInTheDocument();
    });
})



