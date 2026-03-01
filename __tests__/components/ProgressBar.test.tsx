import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressBar } from '@/components/ProgressBar';

describe('ProgressBar', () => {
  it('renders without error', () => {
    expect(() => render(<ProgressBar value={0.5} />)).not.toThrow();
  });

  it('fill width is 0% for value 0', () => {
    const { getByTestId } = render(<ProgressBar value={0} />);
    expect(getByTestId('progress-bar-fill').props.style).toMatchObject({ width: '0%' });
  });

  it('fill width is 50% for value 0.5', () => {
    const { getByTestId } = render(<ProgressBar value={0.5} />);
    expect(getByTestId('progress-bar-fill').props.style).toMatchObject({ width: '50%' });
  });

  it('fill width is 100% for value 1', () => {
    const { getByTestId } = render(<ProgressBar value={1} />);
    expect(getByTestId('progress-bar-fill').props.style).toMatchObject({ width: '100%' });
  });

  it('clamps values above 1 to 100%', () => {
    const { getByTestId } = render(<ProgressBar value={2} />);
    expect(getByTestId('progress-bar-fill').props.style).toMatchObject({ width: '100%' });
  });

  it('clamps negative values to 0%', () => {
    const { getByTestId } = render(<ProgressBar value={-1} />);
    expect(getByTestId('progress-bar-fill').props.style).toMatchObject({ width: '0%' });
  });

  it('renders the track element', () => {
    const { getByTestId } = render(<ProgressBar value={0.5} />);
    expect(getByTestId('progress-bar-track')).toBeTruthy();
  });
});
