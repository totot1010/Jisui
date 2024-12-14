
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SignupView from './Signup';

describe('SignupView', () => {
  const defaultProps = {
    userId: '',
    setUserId: vi.fn(),
    email: '',
    setEmail: vi.fn(),
    password: '',
    setPassword: vi.fn(),
    confirmPassword: '',
    setConfirmPassword: vi.fn(),
    error: '',
    onSubmit: vi.fn(),
  }

  it('コンポーネントがレンダリングされること', () => {
    render(<SignupView {...defaultProps} />);
    const heading = screen.getByRole('heading', { name: 'サインアップ' });
    expect(heading).toBeInTheDocument();
  });

  it('エラーメッセージが表示されること', () => {
    const error = 'エラーメッセージ';
    render(<SignupView {...defaultProps} error={error} />);
    const errorMessage = screen.getByText(error);
    expect(errorMessage).toBeInTheDocument();
  });

  it('ユーザーID入力フォームが表示されること', () => {
    render(<SignupView {...defaultProps} />);
    const userIdInput = screen.getByLabelText('ユーザーID');
    expect(userIdInput).toBeInTheDocument();
  });

  it('メールアドレス入力フォームが表示されること', () => {
    render(<SignupView {...defaultProps} />);
    const emailInput = screen.getByLabelText('メールアドレス');
    expect(emailInput).toBeInTheDocument();
  });

  it('パスワード入力フォームが表示されること', () => {
    render(<SignupView {...defaultProps} />);
    const passwordInput = screen.getByLabelText('パスワード');
    expect(passwordInput).toBeInTheDocument();
  });

  it('パスワード（確認）入力フォームが表示されること', () => {
    render(<SignupView {...defaultProps} />);
    const confirmPasswordInput = screen.getByLabelText('パスワード（確認）');
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it('サインアップボタンが表示されること', () => {
    render(<SignupView {...defaultProps} />);
    const signupButton = screen.getByRole('button', { name: 'サインアップ' });
    expect(signupButton).toBeInTheDocument();
  });

  it('ユーザーID入力フォームに入力された値がsetUserIdに渡されること', () => {
    const setUserId = vi.fn();
    render(<SignupView {...defaultProps} setUserId={setUserId} />);
    const userIdInput = screen.getByLabelText('ユーザーID');
    fireEvent.change(userIdInput, { target: { value: 'test' } });
    expect(setUserId).toHaveBeenCalledWith('test');
  });

  it('メールアドレス入力フォームに入力された値がsetEmailに渡されること', () => {
    const setEmail = vi.fn();
    render(<SignupView {...defaultProps} setEmail={setEmail} />);
    const emailInput = screen.getByLabelText('メールアドレス');
    fireEvent.change(emailInput, { target: { value: 'a@a.com' } });
    expect(setEmail).toHaveBeenCalledWith('a@a.com');
  });

  it('パスワード入力フォームに入力された値がsetPasswordに渡されること', () => {
    const setPassword = vi.fn();
    render(<SignupView {...defaultProps} setPassword={setPassword} />);
    const passwordInput = screen.getByLabelText('パスワード');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(setPassword).toHaveBeenCalledWith('password');
  });

  it('パスワード（確認）入力フォームに入力された値がsetConfirmPasswordに渡されること', () => {
    const setConfirmPassword = vi.fn();
    render(<SignupView {...defaultProps} setConfirmPassword={setConfirmPassword} />);
    const confirmPasswordInput = screen.getByLabelText('パスワード（確認）');
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    expect(setConfirmPassword).toHaveBeenCalledWith('password');
  });

  it('入力がない時にサインアップボタンがクリックされてもonSubmitは呼ばれないこと', () => {
    const onSubmit = vi.fn(e => e.preventDefault());

    render(<SignupView {...defaultProps} onSubmit={onSubmit} />);
    const signupButton = screen.getByRole('button', { name: 'サインアップ' });
    fireEvent.click(signupButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('入力があればサインアップボタンがクリックされた時にonSubmitが呼ばれること', () => {
    const onSubmit = vi.fn(e => e.preventDefault());
    render(<SignupView {...defaultProps} onSubmit={onSubmit} userId='test' email='a@a.com' password='password' confirmPassword='password' />);
    const signupButton = screen.getByRole('button', { name: 'サインアップ' });
    fireEvent.click(signupButton);
    expect(onSubmit).toHaveBeenCalled();
  });

  it('ログイン画面への遷移リンクが表示されること', () => {
    render(<SignupView {...defaultProps} />);
    const loginLink = screen.getByRole('link', { name: 'ログイン' });
    expect(loginLink).toBeInTheDocument();
  });

});