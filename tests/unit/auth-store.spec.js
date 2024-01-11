import { beforeEach, describe, expect, test, vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../../src/stores/auth';
import axios from '../../src/api.js';
import MockAdapter from 'axios-mock-adapter';

describe('Auth Store', () => {
  let authStore;

  beforeEach(() => {
    setActivePinia(createPinia()); // Create an active Pinia instance
    authStore = useAuthStore(); // Initialize authStore

    // Mock localStorage
    globalThis.localStorage = {
      getItem: () => 'example-token'
    }
  });

  test('fetches user data', async () => {
    const data = { id: 1, name: 'Test User' };
    const axiosMock = new MockAdapter(axios);
    axiosMock.onGet('/me/').reply(200, data);

    await authStore.getUser();

    await flushPromises();
    expect(axiosMock.history.get.length).toBe(1);
    expect(axiosMock.history.get[0].url).toBe('/me/');
    expect(axiosMock.history.get[0].headers['Authorization']).toBe('Bearer example-token');
    expect(authStore.user).toEqual(data);
  });

});
