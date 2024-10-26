"use client";

import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";

interface User {
  id: string;
  name: string;
  profileImage: string;
  role: string;
}

export interface CommentType {
  id: string;
  content: string;
  timestamp: string;
  author: User;
  likes: number;
  replies: CommentType[];
}

interface CommentItemProps {
  comment: CommentType;
  depth?: number;
}

interface CommentListProps {
  comments: CommentType[];
  depth?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [likes, setLikes] = useState(comment.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setHasLiked(!hasLiked);
  };

  const formattedDate = new Date(comment.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="mb-4" style={{ marginLeft: `${depth * 24}px` }}>
      <div className="border rounded-lg p-4 bg-white">
        {/* Author Info */}
        <div className="flex items-center mb-2">
          <img
            src={comment.author.profileImage}
            alt={comment.author.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <div className="font-medium">{comment.author.name}</div>
            <div className="text-sm text-gray-500">{comment.author.role}</div>
          </div>
          <div className="text-sm text-gray-400 ml-auto">{formattedDate}</div>
        </div>

        {/* Comment Content */}
        <div className="ml-10 mb-2">{comment.content}</div>

        {/* Actions */}
        <div className="flex items-center ml-10 space-x-4">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 text-sm"
            data-testid="like-button"
          >
            <ThumbsUp
              size={16}
              className={`${hasLiked ? 'fill-blue-500 text-blue-500' : 'text-gray-500'}`}
            />
            <span className={`${hasLiked ? 'text-blue-500' : 'text-gray-500'}`}>
              {likes}
            </span>
          </button>
          {comment.replies.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-gray-500"
              data-testid="toggle-replies"
            >
              {isExpanded ? 'Hide' : 'Show'} {comment.replies.length} replies
            </button>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {isExpanded && comment.replies.length > 0 && (
        <div className="mt-2">
          <CommentList comments={comment.replies} depth={depth + 1} />
        </div>
      )}
    </div>
  );
};

export const CommentList: React.FC<CommentListProps> = ({ comments, depth = 0 }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} depth={depth} />
      ))}
    </div>
  );
};
