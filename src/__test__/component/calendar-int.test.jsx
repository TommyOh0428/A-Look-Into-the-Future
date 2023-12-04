import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Calendar from '../../component/calendarComponent/calendar';

describe('Google Calendar Integration Tests', () => {
  test('Render calendar', () => {
    const { getByText } = render(<Calendar />);
    const monthYear = getByText('December 2023');
    expect(monthYear).toBeInTheDocument();
    // Add more assertions to verify the calendar's presence and correctness
  });


});