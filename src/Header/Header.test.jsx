import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Header from './Header';


test ("When header is rendered, I can read 'Jammming' on the screen", () => {
    //Render header
    render(<Header />);
    //Check if jammming is on screen
    const header = screen.getByRole("heading");
    expect(header.textContent).toEqual("Jammming");
})