import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Weather from './Weather'; 

test('renders weather data after fetching', async () => {
  // Mock the fetch function to return a mocked response
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        label: 'Vancouver',
        main: { temp: 20 },
        weather: [{ main: 'Cloudy' }],
      }),
  });

  const { getByText } = render(<Weather />);

  // Wait for the component to fetch data and render it
  await waitFor(() => {
    expect(getByText('Vancouver')).toBeInTheDocument();
    expect(getByText('Temp: 20°C')).toBeInTheDocument();
    expect(getByText('Cond: Cloudy')).toBeInTheDocument();
  });
});

test('handles failed data fetching', async () => {
  // Mock the fetch function to return an error response
  global.fetch = jest.fn().mockResolvedValue({ ok: false });

  const { getByText } = render(<Weather />);

  // Wait for the component to handle the error and render an error message
  await waitFor(() => {
    expect(getByText('Failed to fetch data')).toBeInTheDocument();
  });
});
