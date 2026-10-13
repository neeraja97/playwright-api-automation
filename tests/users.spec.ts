import { test, expect } from '@playwright/test';

test('Get user by ID', async ({ request }) => {

  const userId = 2;

  const response = await request.get(`/users/${userId}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(userId);
  expect(body.name).toBeTruthy();
  expect(body.email).toBeTruthy();
});


test('Get user using query parameter', async ({ request }) => {

  const response = await request.get('/users', {
    params: {
      username: 'Bret'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThan(0);
  expect(body[0].username).toBe('Bret');
});


test('Create a new user', async ({ request }) => {

  const response = await request.post('/users', {
    data: {
      name: 'Neeraja',
      username: 'neeraja',
      email: 'neeraja@example.com'
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.name).toBe('Neeraja');
  expect(body.username).toBe('neeraja');
  expect(body.email).toBe('neeraja@example.com');
  expect(body.id).toBeTruthy();
});