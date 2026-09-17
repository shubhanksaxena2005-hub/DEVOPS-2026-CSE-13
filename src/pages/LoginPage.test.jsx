import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
}

describe('LoginPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders heading, email/password fields and role selector', () => {
    renderLoginPage();
    expect(screen.getByRole('heading', { name: /login to your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /farmer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /admin/i })).toBeInTheDocument();
  });

  it('defaults to the "Farmer" role selected', () => {
    renderLoginPage();
    const farmerButton = screen.getByRole('button', { name: /farmer/i });
    expect(farmerButton.className).toMatch(/border-green-700/);
  });

  it('allows switching between Farmer and Admin roles', async () => {
    const user = userEvent.setup();
    renderLoginPage();
    const adminButton = screen.getByRole('button', { name: /admin/i });
    await user.click(adminButton);
    expect(adminButton.className).toMatch(/border-green-700/);
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

  it('navigates to /farmer/dashboard on submit when role is farmer', async () => {
    const user = userEvent.setup();
    renderLoginPage();
    await user.type(screen.getByLabelText(/email address/i), 'farmer@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/farmer/dashboard'), {
      timeout: 2000,
    });
  });

  it('navigates to /admin/dashboard on submit when role is admin', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.click(screen.getByRole('button', { name: /admin/i }));
    await user.type(screen.getByLabelText(/email address/i), 'admin@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard'), {
      timeout: 2000,
    });
  });

  it('shows a loading state while submitting', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.type(screen.getByLabelText(/email address/i), 'farmer@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/logging in\.\.\./i)).toBeInTheDocument();
  });

  it('renders a link to the register page', () => {
    renderLoginPage();
    const registerLink = screen.getByRole('link', { name: /register here/i });
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
