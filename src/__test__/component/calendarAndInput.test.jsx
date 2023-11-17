import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Calendar from './Calendar';
import InputField from './InputField';

describe('Integration tests for Calendar and InputField components', () => {
  test('adds an event to the calendar', async () => {
    render(<Calendar />);
    render(<InputField />);

    const eventNameInput = screen.getByPlaceholderText('Event Name');
    const eventDescriptionInput = screen.getByPlaceholderText('Event Description');
    const addEventButton = screen.getByText('Add');

    fireEvent.change(eventNameInput, { target: { value: 'Test Event' } });
    fireEvent.change(eventDescriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(addEventButton);

    await waitFor(() => screen.getByText('Test Event'));

    const eventElement = screen.getByText('Test Event');
    expect(eventElement).toBeInTheDocument();
  });
});