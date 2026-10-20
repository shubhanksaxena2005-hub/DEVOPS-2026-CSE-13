// Frontend test suite for AgriSathi.
// Covers every source file, routing + login guard, all farmer pages and the shared UI components.
// Plain .js (no JSX), so elements are built with React.createElement (aliased as `h`).
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createElement as h } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// ---------- mocks: API client + logged-in user ----------
const { mockApi, auth } = vi.hoisted(() => ({
  mockApi: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
  auth: { user: null, initializing: false, login: vi.fn(), register: vi.fn(), logout: vi.fn(), setUser: vi.fn() },
}));

vi.mock('./lib/api', async () => {
  const actual = await vi.importActual('./lib/api');
  return { ...actual, api: mockApi };
});

vi.mock('./context/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => auth,
}));

import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/layout/Sidebar';
import DashboardLayout from './components/layout/DashboardLayout';
import Logo from './components/layout/Logo';
import Button from './components/ui/Button';
import Badge from './components/ui/Badge';
import Modal from './components/ui/Modal';
import Table from './components/ui/Table';
import DashboardCard from './components/ui/DashboardCard';
import PageHeader from './components/ui/PageHeader';
import { LoadingState, EmptyState, ErrorState, InfoBanner } from './components/ui/StatusState';
import { Input, Select, TextArea } from './components/ui/FormInputs';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import MyFarm from './pages/farmer/MyFarm';
import FarmJournal from './pages/farmer/FarmJournal';
import ProfileSettings from './pages/farmer/ProfileSettings';

const farmer = {
  _id: 'u1',
  name: 'Ramesh Patil',
  email: 'ramesh@example.com',
  phone: '',
  location: { district: 'Nashik', state: 'Maharashtra' },
  createdAt: '2026-10-01T00:00:00.000Z',
};
const today = new Date().toISOString();

const withRouter = (ui, path = '/') => render(h(MemoryRouter, { initialEntries: [path] }, ui));

beforeEach(() => {
  Object.values(mockApi).forEach((fn) => fn.mockReset());
  Object.assign(auth, { user: farmer, initializing: false });
  auth.logout.mockReset();
  auth.setUser.mockReset();
});

// ---------------------------------------------------------------
describe('Source files', () => {
  // Every component, page and helper in src/ (tests and the browser entry point excluded)
  const modules = import.meta.glob(['./**/*.{js,jsx}', '!./**/*.test.{js,jsx}', '!./main.jsx', '!./setupTests.js']);

  it('finds the frontend source files', () => {
    expect(Object.keys(modules).length).toBeGreaterThan(20);
  });

  it.each(Object.keys(modules))('%s loads without errors', async (file) => {
    const mod = await modules[file]();
    expect(Object.keys(mod).length).toBeGreaterThan(0);
  }, 30000); // first import of heavy libraries (charts) can be slow on a cold CI machine
});

// ---------------------------------------------------------------
describe('Routing and login guard', () => {
  it('shows the landing page at /', async () => {
    auth.user = null;
    withRouter(h(App), '/');
    expect(await screen.findByRole('heading', { level: 1, name: /keep your farm records/i })).toBeInTheDocument();
  });

  it('sends logged-out users from /farmer/dashboard to the login page', async () => {
    auth.user = null;
    withRouter(h(App), '/farmer/dashboard');
    expect(await screen.findByRole('heading', { name: /login to your account/i })).toBeInTheDocument();
  });

  it('opens the dashboard for a logged-in farmer', async () => {
    mockApi.get.mockResolvedValue({ dashboard: emptyDashboard() });
    withRouter(h(App), '/farmer/dashboard');
    expect(await screen.findByText(/namaste, ramesh/i)).toBeInTheDocument();
  });

  it('redirects unknown URLs to the landing page', async () => {
    auth.user = null;
    withRouter(h(App), '/no-such-page');
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/keep your farm records/i);
  });

  it('ProtectedRoute shows a loading state while the session is checked', () => {
    Object.assign(auth, { user: null, initializing: true });
    withRouter(h(ProtectedRoute, null, h('p', null, 'secret page')));
    expect(screen.getByText(/checking your session/i)).toBeInTheDocument();
    expect(screen.queryByText('secret page')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------
function emptyDashboard() {
  return {
    farmer,
    farmsSummary: { count: 0, totalArea: 0, farms: [] },
    expensesSummary: { count: 0, total: 0, thisMonth: 0, byCategory: [] },
    activitiesSummary: { count: 0 },
    recentExpenses: [],
    recentActivities: [],
  };
}

describe('Farmer Dashboard', () => {
  it('shows the get-started checklist for a new farmer', async () => {
    mockApi.get.mockResolvedValue({ dashboard: emptyDashboard() });
    withRouter(h(FarmerDashboard));
    expect(await screen.findByText('Get started')).toBeInTheDocument();
    expect(screen.getByText('Add your farm details')).toBeInTheDocument();
    expect(mockApi.get).toHaveBeenCalledWith('/dashboard');
  });

  it('shows live totals from the API', async () => {
    mockApi.get.mockResolvedValue({
      dashboard: {
        ...emptyDashboard(),
        farmsSummary: { count: 1, totalArea: 4, farms: [{ landArea: 4, landUnit: 'acres' }] },
        expensesSummary: { count: 2, total: 3600, thisMonth: 1200, byCategory: [{ category: 'Seeds', total: 2400 }] },
        activitiesSummary: { count: 1 },
        recentExpenses: [{ _id: 'e1', description: 'Wheat seeds', category: 'Seeds', amount: 2400, date: today }],
        recentActivities: [{ _id: 'a1', title: 'Sowed wheat', activityType: 'Sowing', date: today }],
      },
    });
    withRouter(h(FarmerDashboard));
    expect(await screen.findByText('4 acres total')).toBeInTheDocument();
    expect(screen.getByText('₹3,600')).toBeInTheDocument();
    expect(screen.getByText('Wheat seeds')).toBeInTheDocument();
    expect(screen.getByText('Sowed wheat')).toBeInTheDocument();
    expect(screen.queryByText('Get started')).not.toBeInTheDocument();
  });

  it('shows an error with a retry button when the API fails', async () => {
    mockApi.get.mockRejectedValue(new Error('Cannot reach the server.'));
    withRouter(h(FarmerDashboard));
    expect(await screen.findByText('Cannot reach the server.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------
describe('My Farm', () => {
  it('shows an empty state when no farms exist', async () => {
    mockApi.get.mockResolvedValue({ farms: [] });
    withRouter(h(MyFarm));
    expect(await screen.findByText('No farms yet')).toBeInTheDocument();
  });

  it('lists farms from the API', async () => {
    mockApi.get.mockResolvedValue({
      farms: [{ _id: 'f1', name: 'Patil Farm', landArea: 3.5, landUnit: 'acres', soilType: 'Black', soilPh: 6.8, waterSource: 'Borewell', location: { village: 'Dindori' } }],
    });
    withRouter(h(MyFarm));
    expect(await screen.findByText('Patil Farm')).toBeInTheDocument();
    expect(screen.getByText('3.5 acres')).toBeInTheDocument();
    expect(screen.getByText('Black (pH 6.8)')).toBeInTheDocument();
  });

  it('creates a farm through the API', async () => {
    mockApi.get.mockResolvedValue({ farms: [] });
    mockApi.post.mockResolvedValue({ farm: { _id: 'f2', name: 'North Field', landArea: 2, landUnit: 'acres', location: {} } });
    const user = userEvent.setup();
    withRouter(h(MyFarm));

    await user.click(await screen.findByRole('button', { name: /add farm/i }));
    await user.type(screen.getByLabelText(/farm name/i), 'North Field');
    await user.type(screen.getByLabelText(/land area/i), '2');
    await user.click(screen.getByRole('button', { name: /save farm/i }));

    expect(mockApi.post).toHaveBeenCalledWith('/farms', expect.objectContaining({ name: 'North Field', landArea: 2 }));
    expect(await screen.findByText('North Field')).toBeInTheDocument();
  });

  it('requires a farm name and land area', async () => {
    mockApi.get.mockResolvedValue({ farms: [] });
    const user = userEvent.setup();
    withRouter(h(MyFarm));

    await user.click(await screen.findByRole('button', { name: /add farm/i }));
    await user.click(screen.getByRole('button', { name: /save farm/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/farm name is required/i);
    expect(mockApi.post).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------
describe('Activity Journal', () => {
  it('shows an empty journal for a new farmer', async () => {
    mockApi.get.mockResolvedValue({ activities: [] });
    withRouter(h(FarmJournal));
    expect(await screen.findByText('Your journal is empty')).toBeInTheDocument();
  });

  it('lists journal entries with their details', async () => {
    mockApi.get.mockResolvedValue({
      activities: [{ _id: 'a1', title: 'First irrigation', activityType: 'Irrigation', cropName: 'Wheat', timeSpent: '2 hours', notes: 'Drip line', date: today }],
    });
    withRouter(h(FarmJournal));
    expect(await screen.findByText('First irrigation')).toBeInTheDocument();
    expect(screen.getByText('Wheat')).toBeInTheDocument();
    expect(screen.getByText('2 hours')).toBeInTheDocument();
    expect(screen.getByText('1 entry')).toBeInTheDocument();
  });

  it('logs a new activity through the API', async () => {
    mockApi.get.mockResolvedValue({ activities: [] });
    mockApi.post.mockResolvedValue({ activity: { _id: 'a2', title: 'Sowed wheat', activityType: 'Sowing', date: today } });
    const user = userEvent.setup();
    withRouter(h(FarmJournal));

    await user.click(await screen.findByRole('button', { name: /log activity/i }));
    await user.type(screen.getByLabelText(/what did you do/i), 'Sowed wheat');
    await user.click(screen.getByRole('button', { name: /save entry/i }));

    expect(mockApi.post).toHaveBeenCalledWith('/activities', expect.objectContaining({ title: 'Sowed wheat', activityType: 'Sowing' }));
    expect(await screen.findByText('Sowed wheat')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------
describe('Profile', () => {
  it('shows the account email and saves changes through the API', async () => {
    mockApi.put.mockResolvedValue({ user: { ...farmer, phone: '9876543210' } });
    const user = userEvent.setup();
    withRouter(h(ProfileSettings));

    expect(screen.getByText('ramesh@example.com')).toBeInTheDocument();
    await user.type(screen.getByLabelText(/phone number/i), '9876543210');
    await user.click(screen.getByRole('button', { name: /save changes/i }));

    expect(mockApi.put).toHaveBeenCalledWith('/auth/profile', expect.objectContaining({ phone: '9876543210' }));
    expect(await screen.findByText(/profile saved/i)).toBeInTheDocument();
    expect(auth.setUser).toHaveBeenCalled();
  });

  it('rejects an invalid phone number', async () => {
    const user = userEvent.setup();
    withRouter(h(ProfileSettings));
    await user.type(screen.getByLabelText(/phone number/i), 'abc');
    await user.click(screen.getByRole('button', { name: /save changes/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/valid phone number/i);
    expect(mockApi.put).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------
describe('Layout', () => {
  it('Sidebar shows the logged-in farmer and only the real features', () => {
    withRouter(h(Sidebar));
    expect(screen.getByText('Ramesh Patil')).toBeInTheDocument();
    expect(screen.getByText('RP')).toBeInTheDocument();
    expect(screen.getByText('Nashik, Maharashtra')).toBeInTheDocument();
    const links = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(links).toEqual(expect.arrayContaining(['/farmer/dashboard', '/farmer/my-farm', '/farmer/expenses', '/farmer/journal', '/farmer/profile']));
    expect(links.some((l) => /weather|mandi|recommend/.test(l))).toBe(false);
  });

  it('Sidebar logout clears the session and returns to /login', async () => {
    const user = userEvent.setup();
    render(
      h(MemoryRouter, { initialEntries: ['/farmer/dashboard'] },
        h(Routes, null,
          h(Route, { path: '/farmer/dashboard', element: h(Sidebar) }),
          h(Route, { path: '/login', element: h('p', null, 'login page') })))
    );
    await user.click(screen.getByRole('button', { name: /logout/i }));
    expect(auth.logout).toHaveBeenCalled();
    expect(screen.getByText('login page')).toBeInTheDocument();
  });

  it('DashboardLayout shows the page title and the user email', () => {
    render(
      h(MemoryRouter, { initialEntries: ['/farmer/expenses'] },
        h(Routes, null,
          h(Route, { path: '/farmer', element: h(DashboardLayout) },
            h(Route, { path: 'expenses', element: h('p', null, 'page body') }))))
    );
    expect(screen.getByRole('heading', { name: 'Farm Expenses' })).toBeInTheDocument();
    expect(screen.getByText('ramesh@example.com')).toBeInTheDocument();
    expect(screen.getByText('page body')).toBeInTheDocument();
  });

  it('Logo links to the home page', () => {
    withRouter(h(Logo));
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});

// ---------------------------------------------------------------
describe('UI components', () => {
  it('Button renders its label, variant styles and click handler', async () => {
    const onClick = vi.fn();
    render(h(Button, { variant: 'danger', onClick }, 'Delete'));
    const btn = screen.getByRole('button', { name: 'Delete' });
    expect(btn.className).toMatch(/bg-red-600/);
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Badge renders text with its colour', () => {
    render(h(Badge, { color: 'blue' }, 'Irrigation'));
    expect(screen.getByText('Irrigation').className).toMatch(/bg-blue-100/);
  });

  it('Modal only renders when open and closes on X', async () => {
    const onClose = vi.fn();
    const { rerender } = render(h(Modal, { open: false, onClose, title: 'Add Expense' }, 'form'));
    expect(screen.queryByText('Add Expense')).not.toBeInTheDocument();
    rerender(h(Modal, { open: true, onClose, title: 'Add Expense' }, 'form'));
    expect(screen.getByText('Add Expense')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('Table renders rows, custom cells and the empty message', () => {
    const columns = [{ key: 'name', label: 'Name' }, { key: 'amt', label: 'Amount', render: (r) => `₹${r.amt}` }];
    const { rerender } = render(h(Table, { columns, data: [{ id: 1, name: 'Seeds', amt: 500 }] }));
    const row = screen.getAllByRole('row')[1];
    expect(within(row).getByText('Seeds')).toBeInTheDocument();
    expect(within(row).getByText('₹500')).toBeInTheDocument();
    rerender(h(Table, { columns, data: [], emptyMessage: 'Nothing here' }));
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('DashboardCard and PageHeader render their text', () => {
    render(h('div', null, h(PageHeader, { title: 'My Farm', subtitle: 'Your land' }), h(DashboardCard, { title: 'Total', value: '₹100', subtitle: 'All time' })));
    expect(screen.getByRole('heading', { name: 'My Farm' })).toBeInTheDocument();
    expect(screen.getByText('Your land')).toBeInTheDocument();
    expect(screen.getByText('₹100')).toBeInTheDocument();
    expect(screen.getByText('All time')).toBeInTheDocument();
  });

  it('Status states render loading, empty, error (with retry) and info', async () => {
    const onRetry = vi.fn();
    render(
      h('div', null,
        h(LoadingState, { text: 'Loading farms' }),
        h(EmptyState, { title: 'No data', message: 'Add something' }),
        h(ErrorState, { message: 'Failed', onRetry }),
        h(InfoBanner, { title: 'Tip', message: 'Record daily' }))
    );
    expect(screen.getByText('Loading farms')).toBeInTheDocument();
    expect(screen.getByText('Add something')).toBeInTheDocument();
    expect(screen.getByText('Record daily')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(onRetry).toHaveBeenCalled();
  });

  it('Form inputs link their labels and show errors', () => {
    render(
      h('div', null,
        h(Input, { id: 'amt', label: 'Amount', error: 'Required' }),
        h(Select, { id: 'cat', label: 'Category' }, h('option', null, 'Seeds')),
        h(TextArea, { id: 'notes', label: 'Notes' }))
    );
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toHaveValue('Seeds');
    expect(screen.getByLabelText('Notes').tagName).toBe('TEXTAREA');
  });
});

