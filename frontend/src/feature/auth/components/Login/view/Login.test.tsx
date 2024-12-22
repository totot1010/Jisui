
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginView from './Login';

describe('LoginView', () => {
  const defaultProps = {
    email: '',
    setEmail: vi.fn(),
    password: '',
    setPassword: vi.fn(),
    error: '',
    handleSubmit: vi.fn(),
  }

  it('コンポーネントがレンダリングされること', () => {
    render(<LoginView {...defaultProps} />);
    const heading = screen.getByRole('heading', { name: 'ログイン' });
    expect(heading).toBeInTheDocument();
  });

  it('エラーメッセージが表示されること', () => {
    const error = 'エラーメッセージ';
    render(<LoginView {...defaultProps} error={error} />);
    const errorMessage = screen.getByText(error);
    expect(errorMessage).toBeInTheDocument();
  });

  it('メールアドレス入力フォームが表示されること', () => {
    render(<LoginView {...defaultProps} />);
    const emailInput = screen.getByLabelText('メールアドレス');
    expect(emailInput).toBeInTheDocument();
  });

  it('パスワード入力フォームが表示されること', () => {
    render(<LoginView {...defaultProps} />);
    const passwordInput = screen.getByLabelText('パスワード');
    expect(passwordInput).toBeInTheDocument();
  });
  it('ログインボタンが表示されること', () => {
    render(<LoginView {...defaultProps} />);
    const signupButton = screen.getByRole('button', { name: 'ログイン' });
    expect(signupButton).toBeInTheDocument();
  });

  it('メールアドレス入力フォームに入力された値がsetEmailに渡されること', () => {
    const setEmail = vi.fn();
    render(<LoginView {...defaultProps} setEmail={setEmail} />);
    const emailInput = screen.getByLabelText('メールアドレス');
    fireEvent.change(emailInput, { target: { value: 'a@a.com' } });
    expect(setEmail).toHaveBeenCalledWith('a@a.com');
  });

  it('パスワード入力フォームに入力された値がsetPasswordに渡されること', () => {
    const setPassword = vi.fn();
    render(<LoginView {...defaultProps} setPassword={setPassword} />);
    const passwordInput = screen.getByLabelText('パスワード');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(setPassword).toHaveBeenCalledWith('password');
  });

  it('入力がない時にログインボタンがクリックされてもonSubmitは呼ばれないこと', () => {
    const onSubmit = vi.fn(e => e.preventDefault());

    render(<LoginView {...defaultProps} handleSubmit={onSubmit} />);
    const signupButton = screen.getByRole('button', { name: 'ログイン' });
    fireEvent.click(signupButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('入力があればログインボタンがクリックされた時にonSubmitが呼ばれること', () => {
    const onSubmit = vi.fn(e => e.preventDefault());
    render(<LoginView {...defaultProps} handleSubmit={onSubmit} email='a@a.com' password='password'  />);
    const signupButton = screen.getByRole('button', { name: 'ログイン' });
    fireEvent.click(signupButton);
    expect(onSubmit).toHaveBeenCalled();
  });

  it('サインアップ画面へのリンクが表示されること', () => {
    render(<LoginView {...defaultProps} />);
    const signupLink = screen.getByRole('link', { name: 'サインアップ' });
    expect(signupLink).toBeInTheDocument();
  });
});