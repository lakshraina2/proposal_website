import React, { useState, useEffect, useRef } from 'react';
import { Position } from '../types';

interface FloatingButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  isMoving: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ text, onClick, className, isMoving }) => {
  const [position, setPosition] = useState<Position>({ top: 'auto', left: 'auto' });
  // Used to ensure we switch from static flow to absolute positioning only after first interaction
  const [hasMoved, setHasMoved] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveButton = () => {
    if (!buttonRef.current) return;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;

    // Calculate safe area (padding from edges)
    const padding = 20;

    // Calculate random position ensuring button stays fully within viewport
    const maxLeft = viewportWidth - buttonWidth - padding;
    const maxTop = viewportHeight - buttonHeight - padding;
    
    const randomLeft = Math.max(padding, Math.random() * maxLeft);
    const randomTop = Math.max(padding, Math.random() * maxTop);

    setPosition({
      top: randomTop,
      left: randomLeft
    });
    setHasMoved(true);
  };

  useEffect(() => {
    if (isMoving) {
      moveButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoving]);

  // Merge inline styles for position
  const style: React.CSSProperties = hasMoved ? {
    position: 'fixed',
    top: position.top,
    left: position.left,
    transition: 'all 0.3s ease-out', // Smooth transition for the "running away" effect
    zIndex: 50
  } : {};

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      style={style}
      className={`${className} transform active:scale-95 transition-transform duration-100 shadow-lg`}
    >
      {text}
    </button>
  );
};

export default FloatingButton;
