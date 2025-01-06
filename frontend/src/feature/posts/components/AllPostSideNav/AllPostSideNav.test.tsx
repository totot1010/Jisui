
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AllPostSideNav } from './AllPostSideNav';
import * as logoutModule from '@/feature/auth/actions/logout';

vi.mock('@/feature/auth/actions/logout');

const mockLogout = () => {
  vi.spyOn(logoutModule, 'logout').mockResolvedValue();
}

describe('AllPostSideNav', () => {
  it('料理を投稿ボタンクリックでダイアログが表示されること', () => {
    render(<AllPostSideNav userId={'1'}/>);
    const createPostButton = screen.getByRole('button', { name: '料理を投稿' });
    fireEvent.click(createPostButton);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('マイページリンクが表示されていること', () => {
    render(<AllPostSideNav userId={'1'}/>);
    const myPageLink = screen.getByRole('link', { name: 'マイページ' });
    expect(myPageLink).toBeInTheDocument();
  });

  it('ログアウト処理が実行されること', async () => {
    mockLogout();
    render(<AllPostSideNav userId={'1'}/>);
    const logoutButton = screen.getByRole('button', { name: 'ログアウト' });
    fireEvent.click(logoutButton);
    const logoutConfirmButton = screen.getByRole('button', { name: 'ログアウト' });
    fireEvent.click(logoutConfirmButton);
    expect(logoutModule.logout).toHaveBeenCalled();
  });

});