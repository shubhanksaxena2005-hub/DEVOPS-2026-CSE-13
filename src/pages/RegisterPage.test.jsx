import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderRegisterPage() {
  return render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
}

describe('RegisterPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders heading and all form fields', () => {
    renderRegisterPage();
    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    renderRegisterPage();

    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/please confirm your password/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows an error when passwords do not match', async () => {
    const user = userEvent.setup();
    renderRegisterPage();

    await user.type(screen.getByLabelText(/full name/i), 'Farmer Singh');
    await user.type(screen.getByLabelText(/email address/i), 'farmer@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');
    await user.type(screen.getByLabelText(/confirm password/i), 'different123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('toggles password visibility when clicking the eye icon', async () => {
    const user = userEvent.setup();
    renderRegisterPage();
    const passwordInput = screen.getByLabelText(/^password$/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButton = passwordInput.parentElement.querySelector('button[type="button"]');
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('shows a loading state and navigates to /login on successful submit', async () => {
    const user = userEvent.setup();
    renderRegisterPage();

    await user.type(screen.getByLabelText(/full name/i), 'Farmer Singh');
    await user.type(screen.getByLabelText(/email address/i), 'farmer@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');
    await user.type(screen.getByLabelText(/confirm password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(screen.getByText(/creating account\.\.\./i)).toBeInTheDocument();

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'), { timeout: 2000 });
  });

  it('renders a link back to the login page', () => {
    renderRegisterPage();
    const loginLink = screen.getByRole('link', { name: /log in/i });
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
