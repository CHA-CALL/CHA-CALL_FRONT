import { useEffect, useRef } from 'react';

const useAutosizeTextarea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  const maxHeightRef = useRef<number | null>(null);
  useEffect(() => {
    if (textAreaRef) {
      if (maxHeightRef.current === null) {
        const computedStyle = window.getComputedStyle(textAreaRef);
        const computedMaxHeight = parseFloat(computedStyle.maxHeight);

        if (!isNaN(computedMaxHeight)) {
          maxHeightRef.current = computedMaxHeight;
        } else {
          maxHeightRef.current = Infinity;
        }
      }

      textAreaRef.style.height = 'auto';
      const scrollHeight = textAreaRef.scrollHeight;
      const maxHeight = maxHeightRef.current;

      if (scrollHeight <= maxHeight) {
        textAreaRef.style.height = `${scrollHeight}px`;
        textAreaRef.style.overflowY = 'hidden';
      } else {
        textAreaRef.style.height = `${maxHeight}px`;
        textAreaRef.style.overflowY = 'auto';
      }
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextarea;
