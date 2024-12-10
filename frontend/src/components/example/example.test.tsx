import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Example } from './example';

describe('Example component', () => {
  it('renders the heading', () => {
    render(<Example />);
    const heading = screen.getByText('サンプルコンポーネント');
    expect(heading).toBeInTheDocument();
  });

  it('renders the paragraph', () => {
    render(<Example />);
    const paragraph = screen.getByText('これはサンプルのコンポーネントです。');
    expect(paragraph).toBeInTheDocument();
  });
});