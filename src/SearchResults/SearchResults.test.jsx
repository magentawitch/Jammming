import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { getValidAccessToken } from '../Auth/token';
import SearchResults from './SearchResults';

jest.mock('../Auth/token', () => ({
    getValidAccessToken: jest.fn(),
}));

describe("Search Results module", () => {
    
    beforeEach(() => {
        global.fetch = jest.fn();
    });
    
    afterEach(() => {
        jest.restoreAllMocks(); 
    });
    
    
    const mockTrackData = [
        { name: "Song 1", artists: [{name: "Artist 1"}], album: {name: "Album 1"}, uri: "uri1" },
        { name: "Song 2", artists: [{name: "Artist 2"}], album: {name: "Album 2"}, uri: "uri2" }
    ];
    
    const mockOnAddTrack = jest.fn();
    
    test("Search results are displayed when the user performs a search with valid input", async () => {
        //Given
        getValidAccessToken.mockResolvedValue('valid-token');
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ tracks: { items: mockTrackData } }),
            status: 200,
        });
        //When
        render(<SearchResults onAddTrack={mockOnAddTrack} userInput={"valid input"}  activeTab={"resultsTab"} isSmallScreen={false} />);
        //Then
        await waitFor(() => screen.getByText("Song 1"));
        expect(fetch).toHaveBeenCalled();
        expect(screen.getByText("Song 1")).toBeInTheDocument();
        expect(screen.getByText("Song 2")).toBeInTheDocument();
    
    });

    test("A search is not performed when user input is invalid", async () => {
        //Given
        getValidAccessToken.mockResolvedValue('valid-token');
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ tracks: { items: mockTrackData } }),
            status: 200,
        });
        //When
        render(<SearchResults onAddTrack={mockOnAddTrack} userInput={undefined}  activeTab={"resultsTab"} isSmallScreen={false} />);
        //Then
        await expect(async () => {
            await waitFor(() => {
                expect(fetch).toHaveBeenCalled();
            })
        }).rejects.toThrow();
    });

    test("Search results are not showed on screen when api response if invalid", async () => {
        //Given
        getValidAccessToken.mockResolvedValue('valid-token');
        fetch.mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({ tracks: { items: mockTrackData } }),
            status: 401,
        });
        //When
        render(<SearchResults onAddTrack={mockOnAddTrack} userInput={undefined}  activeTab={"resultsTab"} isSmallScreen={false} />);
        //Then
        await expect(async () => {
            await waitFor(() => {
                screen.getByText("Song 1");
            })
        }).rejects.toThrow();
    });

    test("Calls onAddTrack when the addButton is clicked", async () => {
        //Given
        const user = userEvent.setup();
        getValidAccessToken.mockResolvedValue('valid-token');
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ tracks: { items: mockTrackData } }),
            status: 200,
        });
        render(<SearchResults icon="+" onAddTrack={mockOnAddTrack} userInput={"test"} activeTab={"resultsTab"} isSmallScreen={false} />);
        await waitFor(() => screen.getByText("Song 1"));
        const buttons = screen.getAllByRole("button", { name: "+" });
        //When
        await user.click(buttons[0]);
        //Then
        expect(mockOnAddTrack).toHaveBeenCalled();
    });

    test("If the screen is Small and the Results tab is inactive, the component should have a 'hide' style applied to it", async () => {
        //Given
        getValidAccessToken.mockResolvedValue('valid-token');
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ tracks: { items: mockTrackData } }),
            status: 200,
        });
        //When
        render(<SearchResults onAddTrack={mockOnAddTrack} userInput={"test"} activeTab={"otherTab"} isSmallScreen={true} />);
        await waitFor(() => screen.getByText("Song 1"));
        const container = screen.queryByText("Song");
        //Then
        expect(container).not.toBeInTheDocument;
    });

})


