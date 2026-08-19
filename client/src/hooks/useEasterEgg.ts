import { useEffect, useState } from 'react';

export const useEasterEgg = () => {
  const [isActive, setIsActive] = useState(false);
  const [inputBuffer, setInputBuffer] = useState('');

  useEffect(() => {
    const targetSequence = 'NEXORA';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        const newBuffer = (inputBuffer + key).slice(-targetSequence.length);
        setInputBuffer(newBuffer);

        if (newBuffer === targetSequence) {
          setIsActive((prev) => !prev);
          setInputBuffer('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputBuffer]);

  return {
    isActive,
    close: () => setIsActive(false),
  };
};
