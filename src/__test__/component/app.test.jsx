import Calendar from '../../component/calendarComponent/calendar';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { render, screen, fireEvent,waitFor, findByText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { async } from 'q';

jest.mock('@supabase/auth-helpers-react', () => ({
  useSession: jest.fn(),
  useSupabaseClient: jest.fn(),
}));
describe('Testing UI with login and navigation', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocked implementations after each test
  });

  test('renders the correct page after sign in', () => {
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

    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Check if the correct page is displayed
    const pageElement = getByText('What would you like to do first?'); 
    expect(pageElement).toBeInTheDocument();
  });
  test('renders the correct page after signing in and navigating to main modification page', () => {
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
  
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const modifyButton = getByText('Modify your calendar');   
    fireEvent.click(modifyButton);

    const weatherElement = getByText('Humidity');
    expect(weatherElement).toBeInTheDocument();
    const inputElement = getByText('Until');
    expect(inputElement).toBeInTheDocument();
    const calendarElement = getByText('<');
    expect(calendarElement).toBeInTheDocument();
  });
  test('testing that the back button sends you back to the landing page', () => {
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
  
    const { getByText } = render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );
    const backButton = getByText('Back');   
    fireEvent.click(backButton);

    const pageElement = getByText('What would you like to do first?'); 
    expect(pageElement).toBeInTheDocument();
  });

  test('testing that the sign out button signs you out and shows sign in screen', async () => {
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
  
    const { getByText, findByText, rerender } = render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    ); 
    
    const signOutButton = getByText('Sign Out');   
    fireEvent.click(signOutButton);
  
    // Mock the useSession hook to return null and force a re-render of the App component
    useSession.mockImplementation(() => null);
    rerender(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );
  
    const signInButton = await waitFor(() => findByText('Sign In With Google'));
    expect(signInButton).toBeInTheDocument();
  });


});