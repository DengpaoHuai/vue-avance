import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../../../../../mocks/browser';
import { register, registerSchema } from '../register';
import { beforeEach } from 'vitest';
import { createPinia } from 'pinia';
import { setActivePinia } from 'pinia';

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
beforeEach(() => setActivePinia(createPinia()));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('register function', () => {
  /* it('should register a user successfully', async () => {
    const payload = {
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
    };

    const response = await register(payload);
    expect(response).toEqual({ message: 'User registered successfully' });
  });*/

  it('should validate the schema for too short name', () => {
    const payload = {
      email: 'test@example.com',
      password: 'password123',
      name: 'A', // Trop court
    };

    const validation = registerSchema.safeParse(payload);
    expect(validation.success).toBe(false);
    expect(validation.error?.issues[0].message).toBe('prenom trop court');
  });

  /* it('should handle API validation error', async () => {
    const payload = {
      email: '',
      password: '',
      name: '',
    };

    await expect(register(payload)).rejects.toThrow('Request failed with status code 400');
  });*/
});
