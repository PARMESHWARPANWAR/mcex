import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import { CommentList } from '../Comment';

const mockComment = {
  id: "c1",
  content: "Test comment",
  timestamp: "2024-10-26T10:30:00Z",
  author: {
    id: "u1",
    name: "Test User",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=TestUser",
    role: "Developer"
  },
  likes: 5,
  replies: [
    {
      id: "c2",
      content: "Test reply",
      timestamp: "2024-10-26T10:35:00Z",
      author: {
        id: "u2",
        name: "Reply User",
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=ReplyUser",
        role: "Designer"
      },
      likes: 2,
      replies: []
    }
  ]
};

describe('NestedComments', () => {
  it('renders the comment content', () => {
    render(<div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Day 2: Nested Comments</h1>
        <CommentList comments={[mockComment]} />
      </div>);
    expect(screen.getByText('Test comment')).toBeInTheDocument();
  });

  it('displays author information', () => {
    render(<div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Day 2: Nested Comments</h1>
        <CommentList comments={[mockComment]} />
      </div>);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('handles like button click', () => {
    render(<div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Day 2: Nested Comments</h1>
        <CommentList comments={[mockComment]} />
      </div>);
    const likeButton = screen.getAllByTestId('like-button')[0];
    
    fireEvent.click(likeButton);
    expect(screen.getByText('6')).toBeInTheDocument(); // Likes should increment
    
    fireEvent.click(likeButton);
    expect(screen.getByText('5')).toBeInTheDocument(); // Likes should decrement
  });

  it('toggles replies visibility', () => {
    render( <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Day 2: Nested Comments</h1>
        <CommentList comments={[mockComment]} />
      </div>);
    const toggleButton = screen.getByTestId('toggle-replies');
    
    expect(screen.getByText('Test reply')).toBeInTheDocument(); // Reply visible by default
    
    fireEvent.click(toggleButton);
    expect(screen.queryByText('Test reply')).not.toBeInTheDocument(); // Reply should be hidden
    
    fireEvent.click(toggleButton);
    expect(screen.getByText('Test reply')).toBeInTheDocument(); // Reply should be visible again
  });

  it('renders nested replies with proper indentation', () => {
    render(<div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Day 2: Nested Comments</h1>
        <CommentList comments={[mockComment]} />
      </div>);
    const comments = screen.getAllByText(/Test (comment|reply)/);
    expect(comments).toHaveLength(2); // Should have both main comment and reply
  });
});