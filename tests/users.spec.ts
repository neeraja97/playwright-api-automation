import { test, expect } from '@playwright/test';

test('GET user details', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/1'
    );

    // Status validation
    expect(response.status()).toBe(200);

    // Header validation
    expect(response.headers()['content-type']).toContain('application/json');

    // Response body
    const body = await response.json();

    // Field validation
    expect(body.id).toBe(1);
    expect(body.name).toBe('Leanne Graham');
    expect(body.username).toBe('Bret');
    expect(body.email).toBe('Sincere@april.biz');

    // Data type validation
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.email).toBe('string');
});