
import { test, expect } from '@playwright/test';

test.describe('Day 4 - API Response Validation', () => {

  // Test 1: Validate status code and response headers
  test('should validate status code and content type', async ({ request }) => {
    const response = await request.get('/users/1');

    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
  });

  // Test 2: Validate exact response values
  test('should validate user details', async ({ request }) => {
    const response = await request.get('/users/1');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.name).toBe('Leanne Graham');
    expect(body.username).toBe('Bret');
    expect(body.email).toBe('Sincere@april.biz');
  });

  // Test 3: Validate data types
  test('should validate user data types', async ({ request }) => {
    const response = await request.get('/users/1');
    const body = await response.json();

    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.username).toBe('string');
    expect(typeof body.email).toBe('string');
  });

  // Test 4: Validate nested JSON fields
  test('should validate nested address details', async ({ request }) => {
    const response = await request.get('/users/1');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('address');
    expect(body.address.city).toBe('Gwenborough');
    expect(body.address.zipcode).toBe('92998-3874');
    expect(body.address.geo).toHaveProperty('lat');
    expect(body.address.geo).toHaveProperty('lng');
  });

  // Test 5: Validate users array
  test('should validate all users in the response', async ({ request }) => {
    const response = await request.get('/users');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    for (const user of body) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(user.email).toContain('@');
    }
  });

  // Test 6: Validate a non-existing user
  test('should return 404 for a non-existing user', async ({ request }) => {
    const response = await request.get('/users/9999');

    expect(response.status()).toBe(404);
  });

});
