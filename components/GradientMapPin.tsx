import React from 'react';

interface GradientMapPinProps {
  size?: number;
  className?: string;
}

export default function GradientMapPin({ size = 24, className = "" }: GradientMapPinProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="mapPinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#0047b3" />
        </linearGradient>
      </defs>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 12.5C10.067 12.5 8.5 10.933 8.5 9C8.5 7.067 10.067 5.5 12 5.5C13.933 5.5 15.5 7.067 15.5 9C15.5 10.933 13.933 12.5 12 12.5Z" 
        fill="url(#mapPinGradient)" 
      />
    </svg>
  );
}
