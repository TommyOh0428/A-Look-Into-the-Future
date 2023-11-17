import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar component tests', () => {
  test('renders without crashing and displays current month and year', () => {
    render(<Calendar />);
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthYear = monthNames[date.getMonth()] + ' ' + date.getFullYear();
    const monthYearElement = screen.getByText(currentMonthYear);
    expect(monthYearElement).toBeInTheDocument();
  });
});