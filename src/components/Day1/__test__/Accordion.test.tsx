import { render, screen } from '@testing-library/react';
import { Accordion } from '../Accordion';
import "@testing-library/jest-dom";

const mockItems = [
  {
    id: 1,
    title: "Test Section 1",
    content: "Test Content 1"
  },
  {
    id: 2,
    title: "Test Section 2",
    content: "Test Content 2",
  }
];

describe('Accordion', () => {
  it('renders all accordion items', () => {
    render(<Accordion items={mockItems} />);
    expect(screen.getByText('Test Section 1')).toBeInTheDocument();
    expect(screen.getByText('Test Section 2')).toBeInTheDocument();
  });
});

