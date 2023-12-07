import Calendar from '../../component/calendarComponent/calendar';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import InputField from '../../component/calendarComponent/input_field';

import { MemoryRouter } from 'react-router-dom';
jest.mock('@supabase/auth-helpers-react', () => ({
  useSession: jest.fn(),
  useSupabaseClient: jest.fn(),
}));
describe('Calendar component tests', () => {


  test('renders without crashing and displays current month and year', () => {

    render(<Calendar />);

    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthYear = monthNames[date.getMonth()] + ' ' + date.getFullYear();
    const monthYearElement = screen.getByText(currentMonthYear);


    expect(monthYearElement).toBeInTheDocument();
     
  });
  test('renders event modal when a day is clicked', () => {
    useSession.mockImplementation(() => ({
      user: { email: 'testuser@gmail.com' },
      provider_token: 'mock_provider_token',
    }));
  
    const { getByText } = render(<Calendar />);
  
    // Simulate clicking on a day
    const dayElement = getByText('15'); // Replace '15' with the actual text of the day element
    fireEvent.click(dayElement);
  
    // Check if the event modal is displayed
    const modalElement = getByText('Events on Fri Dec 15 2023:'); // Replace 'Event Modal' with the actual text or label of the modal
    expect(modalElement).toBeInTheDocument();
  });

  
}); 

  test('cancel creation of a new event to calendar', async () => {
    const { getByPlaceholderText, getByText } = render(<InputField />);
    const eventName = getByPlaceholderText('Event Name');
    const eventDescription = getByPlaceholderText('Event Description');
   
      fireEvent.change(eventName, { target: { value: 'Meeting' } });
      fireEvent.change(eventDescription, { target: { value: 'Serious' } });

      fireEvent.click(getByText('Cancel'));

      expect(eventName.value).toBe('');
      expect(eventDescription.value).toBe('');

  });