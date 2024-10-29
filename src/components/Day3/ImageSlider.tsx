'use client'
import Image from "next/image"
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
    imageList: string[],
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ imageList, autoPlay = false,
    autoPlayInterval = 3000, }) => {
    const [currentIdx, setCurrentIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        
        if (autoPlay && !isHovered && imageList.length > 1) {
          intervalId = setInterval(nextIdx, autoPlayInterval);
        }
        
        return () => {
          if (intervalId) {
            clearInterval(intervalId);
          }
        };
      }, [autoPlay, isHovered, autoPlayInterval, imageList.length]);

    const nextIdx = () => {
        setCurrentIndex((current) => (current + 1) % imageList.length)
    }

    const prevIdx = () => {
        setCurrentIndex((current) => current === 0 ? imageList.length - 1 : current - 1)
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
      };

    if(imageList.length==0) return <div>No images to display</div>  

    return (
        <div 
        data-testid = "slider-container"
        className="relative w-full max-w-4xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageList[currentIdx]}
            alt={`Slide ${currentIdx + 1}`}
            fill
            className="object-cover rounded-lg"
            priority={currentIdx === 0}
          />
        </div>
        
        {/* Navigation arrows */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={prevIdx}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextIdx}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        {imageList.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {imageList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIdx 
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
}