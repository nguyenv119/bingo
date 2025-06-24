import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BoxProps {
  category: string;
  value: string;
  onClick: () => void;
  isRevealed: boolean;
}

const Box: React.FC<BoxProps> = ({ category, value, onClick, isRevealed }) => {
  // Log when isRevealed changes for debugging
  useEffect(() => {
    console.log(`Box ${category}-${value} isRevealed: ${isRevealed}`);
  }, [isRevealed, category, value]);

  const basePath = process.env.NODE_ENV === 'production' ? '/bingo' : '';

  return (
    <motion.div
      className="flex items-center justify-center cursor-pointer rounded-md shadow-sm overflow-hidden relative"
      style={{ aspectRatio: '1/1' }}
      onClick={!isRevealed ? onClick : undefined}
      whileHover={!isRevealed ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isRevealed ? { scale: 0.98 } : {}}
    >
      {/* Background color */}
      <div className={`absolute inset-0 ${isRevealed ? 'bg-anthropic-purple' : 'bg-game-blue'}`}></div>
      
      {/* Image layer */}
      <div className="absolute inset-0">
        <img 
          src={`${basePath}/images/${isRevealed ? 'bruh.png' : 'sus.png'}`}
          alt={isRevealed ? 'Bruh' : 'Pook'}
          className={`object-cover w-full h-full ${isRevealed ? 'opacity-30 mix-blend-multiply' : 'opacity-30'}`}
        />
      </div>
      
      {/* Text layer - only show on unrevealed boxes */}
      {!isRevealed && (
        <div className="text-white font-bold text-sm z-10 bg-black/20 px-1 py-0.5 rounded-md backdrop-blur-sm">
          {value}
        </div>
      )}
    </motion.div>
  );
};

export default Box; 