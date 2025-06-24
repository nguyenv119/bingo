import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimationProps {
  imageSrc: string;
}

const emojis = ['😂', '💀', '✨', '🔥', '💯', '🥶', '👁️', '🤪', '😭', '🙌'];
const memeTexts = [
  'Pewkie:', 
  'SOOOOO CUTEEEE...',
  'I love you so much baby',
  'Cutie Patootie',
  'Wifey Wook',
  'My sweet darling',
  "I'm so lucky to have you",
  'My home, my comfort',
  'GOON DEMON',
  'Squish your cheeks pook'
];

const getRandomPosition = () => {
  return {
    x: Math.random() * 80 - 40,
    y: Math.random() * 80 - 40,
    scale: Math.random() * 0.5 + 1.5,
    rotate: Math.random() * 360
  };
};

const generateHearts = (count: number) => {
  return Array(count).fill(0).map(() => ({
    size: Math.random() * 30 + 15,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    initialRotate: Math.random() * 360
  }));
};

const Heart = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#D97757" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const Animation: React.FC<AnimationProps> = ({ imageSrc }) => {
  const [randomEmojis, setRandomEmojis] = useState<string[]>([]);
  const [memeText, setMemeText] = useState('');
  const [glitchActive, setGlitchActive] = useState(false);
  const [hearts, setHearts] = useState<any[]>([]);
  
  useEffect(() => {
    const emojiCount = Math.floor(Math.random() * 4) + 3; // 3-6 emojis
    const newEmojis = Array(emojiCount).fill(0).map(() => 
      emojis[Math.floor(Math.random() * emojis.length)]
    );
    setRandomEmojis(newEmojis);
    
    setMemeText(memeTexts[Math.floor(Math.random() * memeTexts.length)]);
    
    setHearts(generateHearts(8));
    
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, [imageSrc]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: [0.8, 1.2, 1],
      rotate: [0, -5, 5, 0],
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        times: [0, 0.5, 1]
      }
    }
  };

  const emojiVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: i * 0.1,
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8 + (i * 0.2),
        ease: "easeInOut"
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="rounded-lg overflow-hidden bg-white relative">
      <motion.div
        className="relative w-full aspect-square"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background with spinning hearts */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {hearts.map((heart, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${heart.left}%`,
                top: `${heart.top}%`,
              }}
              initial={{ rotate: heart.initialRotate }}
              animate={{ 
                rotate: heart.initialRotate + 360,
              }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                ease: "linear",
                delay: heart.delay
              }}
            >
              <Heart size={heart.size} />
            </motion.div>
          ))}
        </div>

        {/* Main image with effects */}
        <motion.div 
          className={`relative z-10 w-full h-full ${glitchActive ? 'animate-glitch' : ''}`}
          variants={imageVariants}
        >
          <img 
            src={`/images/${imageSrc}`}
            alt="Memory"
            className="object-contain w-full h-full"
          />
        </motion.div>

        {/* Bouncing emojis */}
        {randomEmojis.map((emoji, index) => {
          const position = getRandomPosition();
          return (
            <motion.div
              key={index}
              className="absolute text-4xl z-20"
              style={{
                top: `${50 + position.y}%`,
                left: `${50 + position.x}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: [position.x, position.x + 10, position.x - 10, position.x],
                y: [position.y, position.y - 15, position.y + 5, position.y],
                rotate: [position.rotate, position.rotate + 20, position.rotate - 20, position.rotate],
                transition: {
                  delay: index * 0.1,
                  duration: 2 + index * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              {emoji}
            </motion.div>
          );
        })}

        {/* Meme text */}
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              delay: 0.5,
              duration: 0.5,
              ease: "easeOut"
            }
          }}
        >
          <div className="inline-block bg-black bg-opacity-50 px-4 py-2 rounded-full">
            <p className="text-white font-extrabold text-xl" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
              {memeText}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Animation; 