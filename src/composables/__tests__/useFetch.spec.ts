import { ref, nextTick } from 'vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useFetch from '@/composables/useFetch';
import { mount, flushPromises } from '@vue/test-utils';
import { withSetup } from '@/utils/withSetup';

describe('useFetch composable', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with default values', () => {
    const { isLoading, data, error } = useFetch<any>('https://example.com/api');
    expect(isLoading.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toBe(null);
  });

  it('should fetch data successfully', async () => {
    const mockResponse = { results: [{ id: 1, name: 'Test Item' }] };
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const [{ isLoading, data, error }] = withSetup(() => useFetch<any>('https://example.com/api'));

    await flushPromises();
    expect(isLoading.value).toBe(false);
    expect(data.value).toEqual(mockResponse.results);
    expect(error.value).toBe(null);
  });

  it('should handle fetch errors', async () => {
    const mockError = new Error('Fetch failed');
    global.fetch = vi.fn().mockRejectedValueOnce(mockError);

    const [{ isLoading, data, error }] = withSetup(() => useFetch<any>('https://example.com/api'));

    await flushPromises();

    expect(isLoading.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toBe(mockError.message);
  });

  it('should handle non-Error objects as fetch errors', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce('Unexpected error');

    const [{ isLoading, data, error }] = withSetup(() => useFetch<any>('https://example.com/api'));

    await flushPromises();

    expect(isLoading.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toBe('Unexpected error');
  });

  it('should handle generic errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(null);

    const [{ isLoading, data, error }] = withSetup(() => useFetch<any>('https://example.com/api'));

    await flushPromises();

    expect(isLoading.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toBe('Une erreur est survenue');
  });

  it('should load loading state', async () => {
    const mockResponse = { results: [{ id: 1, name: 'Test Item' }] };
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const [{ isLoading, data, error }] = withSetup(() => useFetch<any>('https://example.com/api'));

    expect(isLoading.value).toBe(true);
    expect(data.value).toBe(null);
    expect(error.value).toBe(null);

    await flushPromises();

    expect(isLoading.value).toBe(false);
    expect(data.value).toEqual(mockResponse.results);
    expect(error.value).toBe(null);
  });
});
