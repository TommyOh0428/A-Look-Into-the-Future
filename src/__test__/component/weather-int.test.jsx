import React from 'react';
import { render, fireEvent, waitFor, screen,act  } from '@testing-library/react';
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
      await act(async () => {
        render(<WeatherApp />);
      });
    
      // Simulate data loading 
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating delay
    
      const highTemps = screen.getAllByText((_, node) => 
        node.textContent.match(/High: \d+°C/)
      );
      highTemps.forEach(highTemp => {
        expect(highTemp).toBeInTheDocument();
      });
    
      const lowTemps = screen.getAllByText((_, node) => 
        node.textContent.match(/Low: \d+°C/)
      );
      lowTemps.forEach(lowTemp => {
        expect(lowTemp).toBeInTheDocument();
      });
    });
  });
});
