import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import WeatherApp from '../../component/weatherComponent/weather';

test('render weather component after fetch the data', async () => {
    // mocking response from the api
    const mockingResponse = {
        main: {
            humidity: 64,
            temp: 24
        },
        wind: {
            speed: 10
        },
        name: "Vancouver",
        weather: [
            {
                icon: "01d"
            }
        ]
    }

    // Mock the global fetch function to return a fake response
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockingResponse)
        })
    );

    // Render the WeatherApp component
  render(<WeatherApp />);

  // Simulate typing 'Test City' into the search input
  fireEvent.change(screen.getByPlaceholderText('search'), { target: { value: 'Vancouver' } });

  // Simulate clicking the search icon
  fireEvent.click(screen.getByRole('img', { name: 'search icon' }));

  // Wait for the component to update based on the fetch response
  await waitFor(() => {
    expect(screen.getByText("Vancouver")).toBeInTheDocument();
    expect(screen.getByText("64%")).toBeInTheDocument();
    expect(screen.getByText("18 km/h")).toBeInTheDocument();
    expect(screen.getByText("24°C")).toBeInTheDocument();
  });
});