import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { loginSchema, login } from '@/features/auth/api/login';
import { z } from 'zod';
import httpClient from '@/modules/http-client';

vi.mock('@/modules/http-client', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('Validation Schema - loginSchema', () => {
  it('should pass with valid data', () => {
    const validData = { email: 'test@example.com', password: 'password123' };
    expect(() => loginSchema.parse(validData)).not.toThrow();
  });

  it('should fail with an invalid email', () => {
    const invalidData = { email: 'not-an-email', password: 'password123' };
    expect(() => loginSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  it('should fail with a short password', () => {
    const invalidData = { email: 'test@example.com', password: '123' };
    expect(() => loginSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  it('should fail with a long password', () => {
    const invalidData = {
      email: 'test@example.com',
      password: 'a'.repeat(21),
    };
    expect(() => loginSchema.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('login Function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a token with valid credentials', async () => {
    const payload = { email: 'test@example.com', password: 'correct_password' };
    const mockResponse = { token: 'fake_jwt_token' };

    (httpClient.post as Mock).mockResolvedValueOnce({ data: mockResponse });

    const data = await login(payload);
    expect(data).toEqual(mockResponse);
    expect(httpClient.post).toHaveBeenCalledWith('/auth/login', payload);
  });

  it('should throw an error with invalid credentials', async () => {
    const payload = { email: 'test@example.com', password: 'wrong_password' };

    (httpClient.post as Mock).mockRejectedValueOnce({
      response: { status: 401, data: { error: 'Invalid credentials' } },
    });

    await expect(login(payload)).rejects.toThrow();
    expect(httpClient.post).toHaveBeenCalledWith('/auth/login', payload);
  });

  it('should handle server errors gracefully', async () => {
    const payload = { email: 'test@example.com', password: 'correct_password' };

    (httpClient.post as Mock).mockRejectedValueOnce({
      response: { status: 500, data: { error: 'Internal Server Error' } },
    });

    await expect(login(payload)).rejects.toThrow();
    expect(httpClient.post).toHaveBeenCalledWith('/auth/login', payload);
  });
});
