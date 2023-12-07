import React, { useState } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { act } from 'react-dom/test-utils';
import {deleteEvent} from '../../component/calendarComponent/calendar';
jest.mock('@supabase/auth-helpers-react', () => ({
  useSession: jest.fn(),
  useSupabaseClient: jest.fn(),
}));

describe('Testing UI with login and navigation', () => {
  const mocking_response = {
    "kind": "calendar#event",
    "id": "mock_provider_token", // Replace with a mock string
    "status": "confirmed", // Replace with a mock string
    "summary" : "Meeting",
    "description": "Serious", // Replace with a mock string
    "start": {
      "dateTime": "2023-12-15T10:00:00-08:00", // Replace with a mock datetime
      "timeZone": "America/Los_Angeles"
    },
    "end": {
      "dateTime": "2023-12-15T11:00:00-08:00", // Replace with a mock datetime
      "timeZone": "America/Los_Angeles"
    },
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
            json: () => Promise.resolve(mocking_response)
        })
    );
    jest.useFakeTimers();
    fetch.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });


  test('testing proper addition of event', async () => {
    // Mock window.alert
    window.alert = jest.fn();
  
    // Set up the mock implementations
    useSession.mockImplementation(() => ({
      user: { email: 'testuser@gmail.com' },
      provider_token: 'mock_provider_token',
    }));
    useSupabaseClient.mockImplementation(() => ({
      auth: {
        signInWithOAuth: jest.fn(),
        signOut: jest.fn(),
      },
    }));
  
    // Render the component
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );
    await act(async () => {
      fireEvent.change(getByPlaceholderText('date'), { target: { value: '2023-12-15' } });
      fireEvent.change(getByPlaceholderText('start time'), { target: { value: '10:00' } });
      fireEvent.change(getByPlaceholderText('end time'), { target: { value: '11:00' } });
      fireEvent.change(getByPlaceholderText('Event Name'), { target: { value: "Meeting" } });
      fireEvent.change(getByPlaceholderText('Event Description'), { target: { value: "Serious" } });

      // Simulate submitting the form or clicking the 'Add' button
      fireEvent.click(getByText('Add'));
    });
    // Wait for the fetch to be called and assert it was called correctly
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock_provider_token',  // This matches the Authorization format in your fetch call
          }),
          body: expect.any(String), // This checks that body is a string, but does not specify the content
        })
      );
    });
    await act(async () => {
      fireEvent.click(getByText('16'));
    });
    
    await waitFor(() => {
      expect(mocking_response.summary).toBe('Meeting');
    });
  });
  test('testing API call on day click', async () => {
    // Set up the mock implementations
    useSession.mockImplementation(() => ({
      user: { email: 'testuser@gmail.com' },
      provider_token: 'mock_provider_token',
    }));
    useSupabaseClient.mockImplementation(() => ({
      auth: {
        signInWithOAuth: jest.fn(),
        signOut: jest.fn(),
      },
    }));
  
    // Render the component
    const { getByText } = render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );
  
    // Simulate clicking on a day
    await act(async () => {
      fireEvent.click(getByText('15'));
    });
  
    // Wait for the fetch to be called and assert it was called correctly
    // Wait for the fetch to be called and assert it was called correctly
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/primary\/events\?timeMin=.*&timeMax=.*/),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock_provider_token',
          }),
        })
      );
    });
  });
  test('testing API call on event delete', async () => {
    // Set up the mock implementations
    useSession.mockImplementation(() => ({
      user: { email: 'testuser@gmail.com' },
      provider_token: 'mock_provider_token',
    }));
    useSupabaseClient.mockImplementation(() => ({
      auth: {
        signInWithOAuth: jest.fn(),
        signOut: jest.fn(),
      },
    }));
  
    // Mock the fetch function to return the mock response when getting events
    global.fetch = jest.fn((url, options) => {
      if (options.method === 'GET') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([mocking_response]),
        });
      } else if (options.method === 'DELETE') {
        return Promise.resolve({
          status: 204,
          json: () => Promise.resolve({ message: 'Event deleted' }), // Add a default response body
        });
      }
    });
  
    // Call deleteEvent directly
    await deleteEvent('mock_event_id', 'mock_provider_token'); // Replace with the actual event ID
  
    // Wait for the fetch to be called and assert it was called correctly
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/primary\/events\/.*$/),
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock_provider_token',
          }),
        })
      );
    });
  });
  
  });