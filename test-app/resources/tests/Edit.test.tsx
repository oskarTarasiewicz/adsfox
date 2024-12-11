import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Edit from '../js/components/Edit';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe('Edit Component', () => {
    it('renders the component and checks if error handler responses', async () => {
        render(
            <MemoryRouter>
                <Edit />
            </MemoryRouter>
        );

        const buttonElement = screen.getByText("ZAPISZ");

        if (!buttonElement) {
            throw new Error('Button element not found');
        }

        fireEvent.click(buttonElement);

        const updatedContent = await waitFor(() =>
            screen.getByText(/Wystapil blad podczas ladowania kanalow/i)
        );

        expect(updatedContent).toBeInTheDocument();
    });
});
