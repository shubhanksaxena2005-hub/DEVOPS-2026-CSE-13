import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Eye, EyeOff } from 'lucide-react';

const roles = [
  { key: 'farmer', label: 'Farmer' },
  { key: 'admin', label: 'Admin' },
];

export default function LoginPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState('farmer');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(role === 'admin' ? '/admin/dashboard' : '/farmer/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-earth-50 px-4 py-12">
      <div className="w-full max-w-md card p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-3">
            <Sprout className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-display font-bold text-gray-900">AgriSathi</h1>
          <p className="text-sm text-gray-500">Your partner in smarter farming</p>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 text-center mb-6">Login to your account</h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {roles.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRole(r.key)}
              className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                role === r.key
                  ? 'border-green-700 bg-green-50 text-green-700'
                  : 'border-earth-300 text-gray-600 hover:bg-earth-50'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`input ${errors.email ? 'border-red-400' : ''}`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`input pr-10 ${errors.password ? 'border-red-400' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          New to AgriSathi?{' '}
          <Link to="/register" className="font-semibold text-green-700 hover:text-green-800">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
