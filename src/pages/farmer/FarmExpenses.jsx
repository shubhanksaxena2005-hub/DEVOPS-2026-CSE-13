import { useCallback, useEffect, useMemo, useState } from 'react';
import { Wallet, Plus, Pencil, Trash2, CalendarDays, Receipt, PieChart as PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import PageHeader from '../../components/ui/PageHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Input, Select, FieldGroup } from '../../components/ui/FormInputs';
import { LoadingState, ErrorState, EmptyState } from '../../components/ui/StatusState';
import { api, formatDate, formatINR, toDateInput } from '../../lib/api';

// Must match the categories allowed by the Expense model
export const EXPENSE_CATEGORIES = ['Seeds', 'Fertilizers', 'Pesticides', 'Labor', 'Irrigation', 'Equipment', 'Transport', 'Other'];

const COLORS = ['#16a34a', '#65a30d', '#d97706', '#0ea5e9', '#7c3aed', '#b07f50', '#db2777', '#6b7280'];

const newForm = () => ({ date: toDateInput(), category: 'Seeds', description: '', amount: '' });

export default function FarmExpenses() {
  const [expenses, setExpenses] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, expense = edit
  const [form, setForm] = useState(newForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setError('');
    api
      .get('/expenses')
      .then((res) => setExpenses(res.expenses))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(load, [load]);

  const stats = useMemo(() => {
    const list = expenses || [];
    const now = new Date();
    const total = list.reduce((sum, e) => sum + e.amount, 0);
    const thisMonth = list
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + e.amount, 0);
    const byCategory = EXPENSE_CATEGORIES.map((name) => ({
      name,
      value: list.filter((e) => e.category === name).reduce((sum, e) => sum + e.amount, 0),
    })).filter((c) => c.value > 0);
    const top = [...byCategory].sort((a, b) => b.value - a.value)[0];
    return { total, thisMonth, byCategory, top };
  }, [expenses]);

  const openNew = () => {
    setForm(newForm());
    setFormError('');
    setEditing({});
  };

  const openEdit = (expense) => {
    setForm({
      date: toDateInput(expense.date),
      category: expense.category,
      description: expense.description,
      amount: String(expense.amount),
    });
    setFormError('');
    setEditing(expense);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description.trim()) return setFormError('Description is required');
    if (!(Number(form.amount) > 0)) return setFormError('Amount must be greater than 0');

    const payload = {
      date: form.date,
      category: form.category,
      description: form.description.trim(),
      amount: Number(form.amount),
    };

    setSaving(true);
    try {
      const res = editing._id
        ? await api.put(`/expenses/${editing._id}`, payload)
        : await api.post('/expenses', payload);
      // replace/insert, keeping newest first
      setExpenses((prev) =>
        [res.expense, ...prev.filter((x) => x._id !== res.expense._id)].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      setEditing(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (expense) => {
    if (!window.confirm(`Delete expense "${expense.description}"?`)) return;
    try {
      await api.delete(`/expenses/${expense._id}`);
      setExpenses((prev) => prev.filter((x) => x._id !== expense._id));
    } catch (err) {
      window.alert(err.message);
    }
  };

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!expenses) return <LoadingState text="Loading expenses..." />;

  const visible = filter === 'All' ? expenses : expenses.filter((e) => e.category === filter);

  const columns = [
    { key: 'date', label: 'Date', render: (row) => <span className="text-gray-600">{formatDate(row.date)}</span> },
    { key: 'category', label: 'Category', render: (row) => <Badge color="earth">{row.category}</Badge> },
    { key: 'description', label: 'Description' },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => <span className="font-semibold text-gray-900">{formatINR(row.amount)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farm Expenses"
        subtitle="Record every cost and see where your money goes"
        icon={Wallet}
        actions={
          <button onClick={openNew} className="btn-primary">
            <Plus className="h-4 w-4" /> Add Expense
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Expenses" value={formatINR(stats.total)} subtitle="All time" icon={Wallet} color="earth" />
        <DashboardCard
          title="This Month"
          value={formatINR(stats.thisMonth)}
          subtitle={new Date().toLocaleDateString('en-IN', { month: 'long' })}
          icon={CalendarDays}
          color="amber"
        />
        <DashboardCard title="Entries" value={expenses.length} subtitle="Expenses recorded" icon={Receipt} color="blue" />
        <DashboardCard
          title="Top Category"
          value={stats.top ? stats.top.name : '—'}
          subtitle={stats.top ? formatINR(stats.top.value) : 'No data yet'}
          icon={PieChartIcon}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-5 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="font-semibold text-gray-900">Expense Records</h2>
            <select
              aria-label="Filter by category"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input sm:w-48"
            >
              <option>All</option>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <Table
            columns={columns}
            data={visible}
            keyField="_id"
            emptyMessage={expenses.length === 0 ? 'No expenses yet. Click "Add Expense" to record one.' : 'No expenses in this category.'}
            actions={(row) => (
              <>
                <button onClick={() => openEdit(row)} aria-label="Edit expense" className="p-1.5 rounded text-gray-500 hover:bg-gray-100">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(row)} aria-label="Delete expense" className="p-1.5 rounded text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          />
        </div>

        <div className="card p-5">
          <h2 className="font-semibold text-gray-900 mb-4">By Category</h2>
          {stats.byCategory.length === 0 ? (
            <EmptyState title="No data yet" message="The chart fills in as you add expenses." />
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.byCategory} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                    {stats.byCategory.map((c) => (
                      <Cell key={c.name} fill={COLORS[EXPENSE_CATEGORIES.indexOf(c.name)]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatINR(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing?._id ? 'Edit Expense' : 'Add Expense'}>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
          <FieldGroup cols={2}>
            <Input id="date" name="date" type="date" label="Date" value={form.date} onChange={handleChange} />
            <Select id="category" name="category" label="Category" value={form.category} onChange={handleChange}>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </FieldGroup>
          <Input
            id="description"
            name="description"
            label="Description *"
            placeholder="e.g. Wheat seeds, 2 bags"
            value={form.description}
            onChange={handleChange}
          />
          <Input
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="1"
            label="Amount (₹) *"
            value={form.amount}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Expense'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
