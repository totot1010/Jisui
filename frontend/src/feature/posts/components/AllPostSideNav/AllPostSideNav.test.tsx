
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AllPostSideNav } from './AllPostSideNav';

describe('AllPostSideNav', () => {
  it('料理を投稿ボタンクリックでダイアログが表示されること', () => {
    render(<AllPostSideNav />);
    const createPostButton = screen.getByRole('button', { name: '料理を投稿' });
    fireEvent.click(createPostButton);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('マイページリンクが表示されていること', () => {
    render(<AllPostSideNav />);
    const myPageLink = screen.getByRole('link', { name: 'マイページ' });
    expect(myPageLink).toBeInTheDocument();
  });
});