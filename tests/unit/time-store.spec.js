import { beforeEach, describe, expect, test, vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useTimeStore } from '../../src/stores/time';
import { useAuthStore } from '../../src/stores/auth';
import axios from '../../src/api.js';
import MockAdapter from 'axios-mock-adapter';

describe('Time Store', () => {
  let timeStore;
  let authStore;

  beforeEach(() => {
    setActivePinia(createPinia()); // Create an active Pinia instance
    timeStore = useTimeStore(); // Initialize timeStore
    authStore = useAuthStore(); // Initialize authStore

    // Mock localStorage
    globalThis.localStorage = {
      getItem: () => 'example-token'
    }
  });

  test('increments time', () => {
    expect(timeStore.timeInSeconds).toBe(600);

    timeStore.up();
    expect(timeStore.timeInSeconds).toBe(900);
  });

  test('decrements time', () => {
    expect(timeStore.timeInSeconds).toBe(600);

    timeStore.down();
    expect(timeStore.timeInSeconds).toBe(300);
  });

  test('starts and stops timer', () => {
    expect(timeStore.isRunning).toBe(false);

    timeStore.startTimer();
    expect(timeStore.isRunning).toBe(true);

    timeStore.stopTimer();
    expect(timeStore.isRunning).toBe(false);
  });

  test('returns formatted time', () => {
    timeStore.timeInSeconds = 45296;
    expect(timeStore.time).toBe('12:34:56');
  });

  test('earns a coin', async () => {
    var mock = new MockAdapter(axios);
    const data = "Coin earned successfully!";
    mock.onPost().reply(200, data);

    const getUserMock = vi.fn().mockImplementation();
    authStore.getUser = getUserMock;

    await timeStore.earnCoin();

    await flushPromises();
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe('/me/earn');
    expect(mock.history.post[0].headers['Authorization']).toBe('Bearer example-token');
    expect(timeStore.earnedCoinAmount).toBe(1);
  });

  test('adds interval', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost().reply(200);
    timeStore.timeInSeconds = 400;
    timeStore.earnedCoinAmount = 3;
  
    await timeStore.addInterval();
  
    await flushPromises();
    const receivedData = JSON.parse(mock.history.post[0].data);
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe('/intervals/add');
    expect(mock.history.post[0].headers['Authorization']).toBe('Bearer example-token');
    expect(receivedData.duration).toBe('3 Minuten');
    expect(receivedData.coinValue).toBe(3);
    expect(timeStore.earnedCoinAmount).toBe(0);
  });
  

});
