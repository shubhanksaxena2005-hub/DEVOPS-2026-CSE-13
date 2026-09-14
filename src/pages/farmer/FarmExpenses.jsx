import { useState } from 'react';
import {
  Wallet,
  Plus,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';

import PageHeader from '../../components/ui/PageHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import { Input, Select, FieldGroup } from '../../components/ui/FormInputs';

import { expenses, expenseCategories, estimatedRevenue } from '../../data/mockData';

// Monthly expense data (mock aggregation)
const monthlyExpenses = [
  { month: 'Mar', amount: 3200 },
  { month: 'Apr', amount: 4800 },
  { month: 'May', amount: 5200 },
  { month: 'Jun', amount: 8600 },
  { month: 'Jul', amount: 7200 },
  { month: 'Aug', amount: 9970 },
];

const categoryData = [
  { name: 'Seeds', value: 6500, color: '#16a34a' },
  { name: 'Fertilizers', value: 2550, color: '#65a30d' },
  { name: 'Pesticides', value: 420, color: '#d97706' },
  { name: 'Labor', value: 2600, color: '#0ea5e9' },
  { name: 'Irrigation', value: 950, color: '#7c3aed' },
  { name: 'Equipment', value: 600, color: '#b07f50' },
];

export default function FarmExpenses() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenseList, setExpenseList] = useState(expenses);

  const totalExpenses = expenseList.reduce((sum, e) => sum + e.amount, 0);
  const totalRevenue = Object.values(estimatedRevenue).reduce((sum, crop) => sum + crop.expectedRevenue, 0);
  const estimatedProfit = totalRevenue - totalExpenses;

  const handleAddExpense = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newExpense = {
      id: expenseList.length + 1,
      date: formData.get('date'),
      category: formData.get('category'),
      description: formData.get('description'),
      amount: parseFloat(formData.get('amount')),
    };
    setExpenseList([newExpense, ...expenseList]);
    setShowAddExpense(false);
  };

  const tableColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (row) => <span className="text-gray-600">{row.date}</span>,
    },
    {
      key: 'category',
      label: 'Category',
      render: (row) => <Badge color="earth">{row.category}</Badge>,
    },
    { key: 'description', label: 'Description' },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => <span className="font-semibold text-gray-900">₹{row.amount.toLocaleString('en-IN')}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farm Expenses"
        subtitle="Track costs and estimate your season's profit"
        icon={Wallet}
        actions={
          <button onClick={() => setShowAddExpense(true)} className="btn-primary">
            <Plus className="h-4 w-4" /> Add Expense
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString('en-IN')}`}
          subtitle="All recorded expenses"
          icon={Wallet}
          color="earth"
        />
        <DashboardCard
          title="August Expenses"
          value={`₹${(9970).toLocaleString('en-IN')}`}
          subtitle="Current month"
          icon={IndianRupee}
          color="red"
        />
        <DashboardCard
          title="Estimated Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          subtitle="Expected from current crops"
          icon={TrendingUp}
          color="green"
        />
        <DashboardCard
          title="Estimated Profit"
          value={`₹${estimatedProfit.toLocaleString('en-IN')}`}
          subtitle="Revenue minus expenses"
          icon={TrendingDown}
          color={estimatedProfit >= 0 ? 'green' : 'red'}
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly trend */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Expenses</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyExpenses}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `₹${v}`}
                />
                <Tooltip formatter={(value) => [`₹${value}`, 'Expenses']} />
                <Bar dataKey="amount" fill="#b07f50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Expenses by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue estimate */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Revenue Estimate by Crop</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Crop</th>
                <th className="table-header">Area</th>
                <th className="table-header">Expected Yield</th>
                <th className="table-header">Market Price</th>
                <th className="table-header">Estimated Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {Object.entries(estimatedRevenue).map(([crop, data]) => (
                <tr key={crop} className="hover:bg-gray-50">
                  <td className="table-cell font-medium text-gray-900">{crop}</td>
                  <td className="table-cell text-gray-600">{data.area}</td>
                  <td className="table-cell text-gray-600">{data.expectedYield}</td>
                  <td className="table-cell text-gray-600">₹{data.marketPrice.toLocaleString('en-IN')}</td>
                  <td className="table-cell font-semibold text-green-700">
                    ₹{data.expectedRevenue.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
              <tr className="bg-green-50">
                <td className="table-cell font-semibold text-gray-900" colSpan="4">Total Expected Revenue</td>
                <td className="table-cell font-bold text-green-800">₹{totalRevenue.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Estimates based on current mandi prices and expected yields. Actual figures depend on final yield and market conditions at harvest.
        </p>
      </div>

      {/* Expense history */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Expense History</h3>
        </div>
        <Table columns={tableColumns} data={expenseList} emptyMessage="No expenses recorded yet" />
      </div>

      {/* Add expense modal */}
      <Modal open={showAddExpense} onClose={() => setShowAddExpense(false)} title="Add Expense">
        <form onSubmit={handleAddExpense} className="space-y-4">
          <FieldGroup cols={2}>
            <div>
              <label className="label">Date</label>
              <input type="date" name="date" required className="input" />
            </div>
            <div>
              <label className="label">Category</label>
              <select name="category" required className="input">
                {expenseCategories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </FieldGroup>
          <div>
            <label className="label">Description</label>
            <input
              type="text"
              name="description"
              required
              placeholder="e.g. DAP fertilizer 50 kg"
              className="input"
            />
          </div>
          <div>
            <label className="label">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              required
              min="1"
              placeholder="e.g. 1500"
              className="input"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddExpense(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Expense
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}