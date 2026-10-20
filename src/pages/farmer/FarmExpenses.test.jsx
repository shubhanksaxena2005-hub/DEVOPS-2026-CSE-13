import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FarmExpenses from './FarmExpenses';

const { mockApi } = vi.hoisted(() => ({
  mockApi: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

vi.mock('../../lib/api', async () => {
  const actual = await vi.importActual('../../lib/api');
  return { ...actual, api: mockApi };
});

// Recharts needs real layout; a stub keeps the test focused on data
vi.mock('recharts', () => {
  const Stub = ({ children }) => <div>{children}</div>;
  return { ResponsiveContainer: Stub, PieChart: Stub, Pie: Stub, Cell: () => null, Tooltip: () => null, Legend: () => null };
});

const today = new Date().toISOString();

describe('FarmExpenses', () => {
  beforeEach(() => {
    Object.values(mockApi).forEach((fn) => fn.mockReset());
  });

  it('shows an empty state for a new farmer', async () => {
    mockApi.get.mockResolvedValue({ expenses: [] });
    render(<FarmExpenses />);

    expect(await screen.findByText(/no expenses yet/i)).toBeInTheDocument();
    expect(screen.getAllByText('₹0').length).toBeGreaterThan(0);
  });

  it('lists expenses from the API and totals them', async () => {
    mockApi.get.mockResolvedValue({
      expenses: [
        { _id: '1', date: today, category: 'Seeds', description: 'Wheat seeds', amount: 1200 },
        { _id: '2', date: today, category: 'Labor', description: 'Weeding labour', amount: 800 },
      ],
    });
    render(<FarmExpenses />);

    expect(await screen.findByText('Wheat seeds')).toBeInTheDocument();
    expect(screen.getByText('Weeding labour')).toBeInTheDocument();
    const totalCard = screen.getByText('Total Expenses').closest('.card');
    expect(within(totalCard).getByText('₹2,000')).toBeInTheDocument();
  });

  it('adds a new expense through the API', async () => {
    mockApi.get.mockResolvedValue({ expenses: [] });
    mockApi.post.mockResolvedValue({
      expense: { _id: '9', date: today, category: 'Fertilizers', description: 'Urea 2 bags', amount: 600 },
    });
    const user = userEvent.setup();
    render(<FarmExpenses />);

    await user.click(await screen.findByRole('button', { name: /add expense/i }));
    await user.selectOptions(screen.getByLabelText('Category'), 'Fertilizers');
    await user.type(screen.getByLabelText(/description/i), 'Urea 2 bags');
    await user.type(screen.getByLabelText(/amount/i), '600');
    await user.click(screen.getByRole('button', { name: /save expense/i }));

    expect(mockApi.post).toHaveBeenCalledWith(
      '/expenses',
      expect.objectContaining({ category: 'Fertilizers', description: 'Urea 2 bags', amount: 600 })
    );
    expect(await screen.findByText('Urea 2 bags')).toBeInTheDocument();
  });

  it('validates the amount before calling the API', async () => {
    mockApi.get.mockResolvedValue({ expenses: [] });
    const user = userEvent.setup();
    render(<FarmExpenses />);

    await user.click(await screen.findByRole('button', { name: /add expense/i }));
    await user.type(screen.getByLabelText(/description/i), 'Something');
    await user.click(screen.getByRole('button', { name: /save expense/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/amount must be greater than 0/i);
    expect(mockApi.post).not.toHaveBeenCalled();
  });
});
