import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SelectionTabs from './SelectionTabs';


test ("When a Results Tab is clicked, the event is sent", async () => {
    //Given
    const mockTabSelection = jest.fn();
    const user = userEvent.setup();
    render(<SelectionTabs onTabSelection={mockTabSelection} />)
    const resultsButton = screen.getByText("Results");
    //When
    await user.click(resultsButton);
    //Then
    expect(mockTabSelection).toHaveBeenCalled();

})

test ("When a Playlist Tab is clicked, the event is sent", async () => {
    //Given
    const mockTabSelection = jest.fn();
    const user = userEvent.setup();
    render(<SelectionTabs onTabSelection={mockTabSelection} />)
    const playlistButton = screen.getByText("Playlist");
    //When
    await user.click(playlistButton);
    //Then
    expect(mockTabSelection).toHaveBeenCalled();
})

test("When Results Tab is active, the 'selectedButton' style is applied to it and the 'unselectedButton' styles is applied to the Playlist Tab", async () => {
    //Given
    const activeTab = "resultsTab";
    //When
    render(<SelectionTabs activeTab={activeTab}/>)
    //Then
    const resultsButton = screen.getByText("Results");
    const playlistButton = screen.getByText("Playlist");
    expect(resultsButton).toHaveClass("selectedButton");
    expect(playlistButton).toHaveClass("unselectedButton");
})


test("When Playlist Tab is active, the 'selectedButton' style is applied to it and the 'unselectedButton' style is applied to the Result Tab", async () => {
    //Given
    const activeTab = "playlistTab";
    //When
    render(<SelectionTabs activeTab={activeTab}/>)
    //Then
    const playlistButton = screen.getByText("Playlist");
    const resultsButton = screen.getByText("Results");
    expect(playlistButton).toHaveClass("selectedButton");
    expect(resultsButton).toHaveClass("unselectedButton");
})


