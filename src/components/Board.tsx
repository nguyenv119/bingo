import { useState, Fragment, useEffect } from 'react';
import Box from './Box';
import Modal from './Modal';
import AudioPlayer from './AudioPlayer';
import categoriesData from '../data/categories.json';
import contentData from '../data/content.json';

type ValueContent = {
  text: string;
  image: string;
};

type CategoryContent = {
  [key: string]: ValueContent;
};

type ContentData = {
  [key: string]: CategoryContent;
};

// Map for display names
const categoryDisplayNames: {[key: string]: string} = {
  "P": "P",
  "O1": "O",
  "O2": "O",
  "K": "K"
};

// Map for value display names
const valueDisplayNames: {[key: string]: string} = {
  "P": "P",
  "O": "O",
  "O2": "O",
  "K": "K"
};

const Board: React.FC = () => {
  const categories = categoriesData as string[];
  const content = contentData as ContentData;
  
  const values = ['P', 'O', 'O2', 'K'];
  
  const [revealedBoxes, setRevealedBoxes] = useState<{[key: string]: boolean}>({});
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<ValueContent>({ text: '', image: '' });
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    console.log('revealedBoxes:', revealedBoxes);
  }, [revealedBoxes]);

  const getBoxId = (category: string, categoryIndex: number, value: string, valueIndex: number) => {
    return `${category}-${value}-${categoryIndex}-${valueIndex}`;
  };

  const handleBoxClick = (category: string, categoryIndex: number, value: string, valueIndex: number) => {
    const boxId = getBoxId(category, categoryIndex, value, valueIndex);
    console.log('Clicked box with ID:', boxId);
    
    setCurrentCategory(categoryDisplayNames[category] || category);
    setCurrentValue(valueDisplayNames[value] || value);
    setCurrentContent(content[category]?.[value] || { text: '', image: '' });
    
    setIsModalOpen(true);
    
    setRevealedBoxes(prev => {
      const newState = {
        ...prev,
        [boxId]: true
      };
      console.log('New revealedBoxes state:', newState);
      return newState;
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <header className="py-4 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">pook bingo</h1>
        <nav className="flex space-x-4 items-center">
          <AudioPlayer audioSrc="/audio/Coldplay - Sparks.mp3" />
        </nav>
      </header>
      
      <div className="grid grid-cols-4 gap-2 bg-white p-4 rounded-lg shadow-sm mb-4">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="bg-anthropic-purple p-2 text-center text-white font-medium rounded-md text-sm"
          >
            {categoryDisplayNames[category] || category}
          </div>
        ))}
        
        {categories.map((category, categoryIndex) => (
          values.map((value, valueIndex) => {
            // Use the same ID generation function
            const boxId = getBoxId(category, categoryIndex, value, valueIndex);
            const isRevealed = revealedBoxes[boxId] || false;
            console.log(`Rendering box ${boxId}, isRevealed: ${isRevealed}`);
            return (
              <Box
                key={boxId}
                category={category}
                value={valueDisplayNames[value] || value}
                onClick={() => handleBoxClick(category, categoryIndex, value, valueIndex)}
                isRevealed={isRevealed}
              />
            );
          })
        ))}
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={currentContent}
        category={currentCategory}
        value={currentValue}
      />
    </div>
  );
};

export default Board; 