import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://example.com/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
  http.post('https://c7fd-90-58-170-121.ngrok-free.app/auth/register', async ({ json }) => {
    const { email, password, name } = await json();

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ message: 'Invalid input data' }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'User registered successfully' }), {
      status: 201,
    });
  }),
];
