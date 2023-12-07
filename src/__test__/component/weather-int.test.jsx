import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import WeatherApp from '../../component/weatherComponent/weather';

describe('WeatherApp Integration Tests', () => {
  -test('search button functionality', async () => {
    render(<WeatherApp />);

    const searchInput = screen.getByPlaceholderText('search');
    fireEvent.change(searchInput, { target: { value: 'Vancouver' } });

    const searchButton = screen.getByAltText('search icon');
    fireEvent.click(searchButton);

    // Assert the expected outcome after the search button is clicked
    await waitFor(() => {
      expect(screen.getByText('Vancouver')).toBeInTheDocument();
    });
  });

  describe('WeatherApp Integration Tests', () => {
    test('current weather temperature display', async () => {
      render(<WeatherApp />);
  
      // Initial render should display a placeholder for the current weather temperature
      const tempPlaceholder = await screen.findByText(/\d+°C/); 
      expect(tempPlaceholder).toBeInTheDocument();
  
      // Simulate data loading 
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating delay
  
        // Check if the actual current weather temperature is displayed after a delay
        await waitFor(() => {
        screen.findByText(/\d+°C/) 
          .then(currentTemp => expect(currentTemp).toBeInTheDocument());
    });
  });
});

  describe('WeatherApp Integration Tests', () => {
    test('high and low temperature display', async () => {
      render(<WeatherApp />);
  

  
      // Simulate data loading 
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating delay
  

      const highTemp = await screen.getByTestId('high-temp'); 
      const lowTemp = await screen.getByTestId('low-temp'); 
  
      expect(highTemp).toBeInTheDocument();
      expect(lowTemp).toBeInTheDocument();
    });
  });
});
