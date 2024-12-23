// tests/hooks/useLogin.test.ts
import * as loginModule from '@/feature/auth/actions/login';
import { vi, expect, describe, afterEach, it } from 'vitest';
import { useLogin } from './useLogin';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

vi.mock('@/feature/auth/actions/login');

function mockLogin(error: boolean) {
  if (error) {
    vi.spyOn(loginModule, 'login').mockResolvedValue({
      type: "error",
      status: "error",
      title: "Invalid credentials",
      message: "Invalid credentials",
    });
  } else {
    vi.spyOn(loginModule, 'login').mockResolvedValue();
  }
}

describe('useLogin', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('デフォルト値で初期化されること', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.error).toBe('');
  });

  it('emailとpasswordが更新されること', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
    });

    expect(result.current.email).toBe('test@example.com');
    expect(result.current.password).toBe('password123');
  });

  it('ログインが成功すること', async () => {
    // Given
    mockLogin(false);

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
    });

    // When
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    // Then
    expect(loginModule.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(result.current.error).toBe('');
  });

  it('ログインが失敗すること', async () => {
    // Given
    mockLogin(true);

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
    });

    // When
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    // Then
    expect(loginModule.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(result.current.error).toBe('Invalid credentials');
  });
});
