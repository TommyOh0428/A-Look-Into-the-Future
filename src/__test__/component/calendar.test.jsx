import Calendar from '../../component/calendarComponent/calendar';
import { render, screen, fireEvent } from '@testing-library/react';
describe('Calendar component tests', () => {


  test('renders without crashing and displays current month and year', () => {

    render(<Calendar />);

    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthYear = monthNames[date.getMonth()] + ' ' + date.getFullYear();
    const monthYearElement = screen.getByText(currentMonthYear);


    expect(monthYearElement).toBeInTheDocument();
    
  });



  test('clicking on a day shows the correct date', async ()=> {
    render(<Calendar />);
    
    
    const dayButton = screen.getByText('15');
    
    // Click the day button
    fireEvent.click(dayButton);
    
    expect(screen.getByText('Selected Date: Wednesday, November 15, 2023')).toBeInTheDocument();
  });
}); 