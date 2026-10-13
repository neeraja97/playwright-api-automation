
import { test, expect } from '@playwright/test';

test.describe('Day 3 - CRUD API Testing', () => {

  // Test 1: PUT - Update the complete user representation
  test('should update a user using PUT', async ({ request }) => {
    const response = await request.put('/users/1', {
      data: {
        name: 'Updated User',
        username: 'updateduser',
        email: 'updated@example.com'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe('Updated User');
    expect(body.username).toBe('updateduser');
    expect(body.email).toBe('updated@example.com');
  });

  // Test 2: PATCH - Update only the email
  test('should partially update a user using PATCH', async ({ request }) => {
    const response = await request.patch('/users/2', {
      data: {
        email: 'newemail@example.com'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.email).toBe('newemail@example.com');
  });

  // Test 3: DELETE - Delete a user
  test('should delete a user', async ({ request }) => {
    const response = await request.delete('/users/3');

    expect(response.status()).toBe(200);
  });

  // Test 4: Dynamic ID - Use a variable in the endpoint
  test('should get a user using a dynamic ID', async ({ request }) => {
    const userId = 5;

    const response = await request.get(`/users/${userId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(userId);
    expect(body.name).toBeTruthy();
    expect(body.email).toBeTruthy();
  });

  // Test 5: Request chaining - Create, read, update and delete
    
test('should perform a CRUD request sequence', async ({ request }) => {

  // 1. CREATE user
  const createResponse = await request.post('/users', {
    data: {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com'
    }
  });

  expect(createResponse.status()).toBe(201);

  const createdUser = await createResponse.json();

  expect(createdUser.name).toBe('Test User');
  expect(createdUser.email).toBe('test@example.com');
  expect(createdUser.id).toBeTruthy();

  const userId = createdUser.id;

  // 2. READ: Verify an existing user
  // JSONPlaceholder does not persist the POST-created user.
  const getResponse = await request.get('/users/1');

  expect(getResponse.status()).toBe(200);

  const user = await getResponse.json();
  expect(user.id).toBe(1);

  // 3. UPDATE: PATCH using the returned ID
  const updateResponse = await request.patch(`/users/${userId}`, {
    data: {
      name: 'Updated Test User'
    }
  });

  expect(updateResponse.status()).toBe(200);

  const updatedUser = await updateResponse.json();
  expect(updatedUser.name).toBe('Updated Test User');

  // 4. DELETE using the returned ID
  const deleteResponse = await request.delete(`/users/${userId}`);

  expect(deleteResponse.status()).toBe(200);
});


});
