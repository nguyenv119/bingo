import { motion } from 'framer-motion';
import Animation from './Animation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    text: string;
    image: string;
  };
  category: string;
  value: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content, category, value }) => {
  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: "20px", opacity: 0 },
    visible: { 
      y: "0", 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 30,
        stiffness: 350
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-lg overflow-hidden max-w-md w-full shadow-xl"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <div className="flex justify-end items-center mb-3">
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <Animation imageSrc={content.image} />
          
          <div className="mt-3">
            <p className="text-base text-center font-medium text-gray-800">{content.text}</p>
          </div>
        </div>
        
        <div className="px-4 py-2 flex justify-end">
          <button
            onClick={onClose}
            className="bg-anthropic-purple text-white px-4 py-1 rounded-md hover:bg-anthropic-purple/90 transition-colors font-medium text-sm"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal; 