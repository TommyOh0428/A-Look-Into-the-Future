import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Weather from './Weather'; // Assuming the component file is named Weather.jsx

const testWeather = {
  name: 'Vancouver',
  main: { temp: 20 },
  weather: [{ main: 'Cloudy' }],
  sys: { sunrise: 1637788792, sunset: 1637825683 }, // Mocked sunrise and sunset Unix timestamps
};

test('displays sunrise and sunset times', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(testWeather),
  });

  const { getByText } = render(<Weather />);

  const expectedSunriseTime = new Date(testWeather.sys.sunrise * 1000).toLocaleTimeString();
  const expectedSunsetTime = new Date(testWeather.sys.sunset * 1000).toLocaleTimeString();

  await waitFor(() => {
    expect(getByText(`Sunrise: ${expectedSunriseTime}`)).toBeInTheDocument();
    expect(getByText(`Sunset: ${expectedSunsetTime}`)).toBeInTheDocument();
  });
});
