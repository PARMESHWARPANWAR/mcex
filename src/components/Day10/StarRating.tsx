'use client'

import React, { useState, useCallback } from 'react'
import { Star } from 'lucide-react';

interface StarRatingProps {
    maxRating?: number;
    initialRating?: number;
    allowHalfStars?: boolean;
    onChange?: (rating: number) => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

const StarRating = ({
    maxRating = 5,
    initialRating = 0,
    allowHalfStars = true,
    onChange,
    size = 'md',
    disabled = false,
}: StarRatingProps) => {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    // Size mappings
    const sizeMap = {
        sm: { star: 16, gap: 'gap-1' },
        md: { star: 24, gap: 'gap-2' },
        lg: { star: 32, gap: 'gap-3' },
    }

    // Calculate star fill based on rating value
    const getStarFill = useCallback((starPosition:number) =>{
        const currentRating = hoverRating || rating;

        if(currentRating >= starPosition) return 100;
        if(allowHalfStars && currentRating + 0.5 >= starPosition) return 50;
        return 0;
    },[hoverRating, rating, allowHalfStars]);

    // Handle mouse movement for precise rating
    const handleMouseMove = (event:React.MouseEvent<HTMLDivElement>, starPosition:number) => {
        if (disabled) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percent = x / rect.width;

        let newRating = starPosition;
        if(allowHalfStars){
            if(percent <= 0.5){
                newRating -= 0.5;
            }
        }

        setHoverRating(newRating);
    }

    // Handle click to set rating
    const handleClick = (rating : number) => {
        if(disabled) return;

        setRating(rating);
        onChange?.(rating);
    }

    return (
        <div
      className={`inline-flex items-center ${sizeMap[size].gap}`}
      role="radiogroup"
      aria-label="Star rating"
    >
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((starPosition) => (
        <div
          key={starPosition}
          className={`relative cursor-pointer transition-transform ${
            !disabled && 'hover:scale-110'
          }`}
          onMouseMove={(e) => handleMouseMove(e, starPosition)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleClick(starPosition)}
          role="radio"
          aria-checked={rating >= starPosition}
          aria-label={`${starPosition} star${starPosition === 1 ? '' : 's'}`}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick(starPosition);
            }
          }}
        >
          <div className="relative">
            {/* Background star */}
            <Star
              size={sizeMap[size].star}
              className="text-gray-200"
              fill="currentColor"
            />
            {/* Filled star overlay with clip-path animation */}
            <Star
              size={sizeMap[size].star}
              className="absolute top-0 left-0 text-yellow-400"
              fill="currentColor"
              style={{
                clipPath: `inset(0 ${100 - getStarFill(starPosition)}% 0 0)`,
                transition: 'clip-path 0.2s ease-in-out',
              }}
            />
          </div>
        </div>
      ))}
      
      {/* Visually hidden live region for screen readers */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
      >
        {rating ? `You have selected ${rating} star${rating === 1 ? '' : 's'}` : 'No rating selected'}
      </div>
    </div>
    )
}

export default StarRating
