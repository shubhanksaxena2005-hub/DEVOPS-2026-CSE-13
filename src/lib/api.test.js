import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api, setToken, clearToken, formatINR } from './api';

const jsonResponse = (status, body) => Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) });

describe('api client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    clearToken();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends the saved token as a Bearer header', async () => {
    setToken('abc123');
    fetch.mockReturnValue(jsonResponse(200, { success: true }));

    await api.get('/farms');

    expect(fetch).toHaveBeenCalledWith('/api/farms', expect.objectContaining({ method: 'GET' }));
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer abc123');
  });

  it('sends JSON bodies for POST requests', async () => {
    fetch.mockReturnValue(jsonResponse(201, { success: true }));

    await api.post('/expenses', { amount: 500 });

    const [, options] = fetch.mock.calls[0];
    expect(options.method).toBe('POST');
    expect(options.headers['Content-Type']).toBe('application/json');
    expect(options.body).toBe(JSON.stringify({ amount: 500 }));
  });

  it('throws the server error message on failure', async () => {
    fetch.mockReturnValue(jsonResponse(401, { success: false, message: 'Invalid email or password' }));

    await expect(api.post('/auth/login', {})).rejects.toThrow('Invalid email or password');
  });

  it('gives a clear message when the server is unreachable', async () => {
    fetch.mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(api.get('/dashboard')).rejects.toThrow(/cannot reach the server/i);
  });

  it('formats rupee amounts in Indian style', () => {
    expect(formatINR(125000)).toBe('₹1,25,000');
  });
});
