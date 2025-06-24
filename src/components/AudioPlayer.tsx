import { useState, useEffect, useRef } from 'react';

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const basePath = process.env.NODE_ENV === 'production' ? '/bingo' : '';
  
  useEffect(() => {
    const fullAudioSrc = `${basePath}${audioSrc}`;
    console.log('Loading audio from:', fullAudioSrc);
    
    audioRef.current = new Audio(fullAudioSrc);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, basePath]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center">
      {isPlaying && (
        <div className="flex items-center mr-2">
          <div className="w-1 h-2 bg-anthropic-purple mx-[1px] animate-soundwave"></div>
          <div className="w-1 h-3 bg-anthropic-purple mx-[1px] animate-soundwave delay-100"></div>
          <div className="w-1 h-4 bg-anthropic-purple mx-[1px] animate-soundwave delay-200"></div>
        </div>
      )}
      <button 
        onClick={togglePlayPause}
        className="bg-anthropic-purple text-white px-3 py-1 rounded-md hover:bg-anthropic-purple/90 transition-all text-sm flex items-center"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer; 