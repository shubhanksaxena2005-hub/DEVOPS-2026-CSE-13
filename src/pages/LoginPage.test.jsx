import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: null, login: mockLogin }),
}));

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
}

async function fillAndSubmit(user, email = 'farmer@example.com', password = 'secret123') {
  await user.type(screen.getByLabelText(/email address/i), email);
  await user.type(screen.getByLabelText(/^password$/i), password);
  await user.click(screen.getByRole('button', { name: /login/i }));
}

describe('LoginPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockLogin.mockReset();
  });

  it('renders heading and email/password fields', () => {
    renderLoginPage();
    expect(screen.getByRole('heading', { name: /login to your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  });

  it('shows validation errors and does not call the API for an empty form', async () => {
    const user = userEvent.setup();
    renderLoginPage();
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('rejects an invalid email address', async () => {
    const user = userEvent.setup();
    renderLoginPage();
    await fillAndSubmit(user, 'not-an-email');

    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('lets the user type into email and password fields', async () => {
    const user = userEvent.setup();
    renderLoginPage();
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password$/i);

    await user.type(emailInput, 'farmer@example.com');
    await user.type(passwordInput, 'secret123');

    expect(emailInput).toHaveValue('farmer@example.com');
    expect(passwordInput).toHaveValue('secret123');
  });

  it('toggles password visibility when clicking the eye icon', async () => {
    const user = userEvent.setup();
    renderLoginPage();
    const passwordInput = screen.getByLabelText(/^password$/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButton = passwordInput.parentElement.querySelector('button[type="button"]');
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('logs in through the API and navigates to the dashboard', async () => {
    mockLogin.mockResolvedValue({ name: 'Farmer' });
    const user = userEvent.setup();
    renderLoginPage();
    await fillAndSubmit(user);

    expect(mockLogin).toHaveBeenCalledWith('farmer@example.com', 'secret123');
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/farmer/dashboard', { replace: true }));
  });

  it('shows a loading state while submitting', async () => {
    mockLogin.mockReturnValue(new Promise(() => {})); // never resolves
    const user = userEvent.setup();
    renderLoginPage();
    await fillAndSubmit(user);

    expect(screen.getByText(/logging in\.\.\./i)).toBeInTheDocument();
  });

  it('shows the server error for wrong credentials and stays on the page', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid email or password'));
    const user = userEvent.setup();
    renderLoginPage();
    await fillAndSubmit(user);

    expect(await screen.findByRole('alert')).toHaveTextContent(/invalid email or password/i);
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /login/i })).toBeEnabled();
  });

  it('renders a link to the register page', () => {
    renderLoginPage();
    const registerLink = screen.getByRole('link', { name: /register here/i });
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
