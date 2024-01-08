import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef
  } from 'react'
  
  export const useKeyPress = (
    keys: string[],
    callback: (event: KeyboardEvent) => void,
    node = null
  ) => {
    // implement the callback ref pattern
    const callbackRef = useRef(callback);
    useLayoutEffect(() => {
      callbackRef.current = callback;
    });
  
    // handle what happens on key press
    const handleKeyPress = useCallback(
      (event: KeyboardEvent) => {
        keys.forEach((key) => {
          // prevent 'ctrl + k' to open browser search bar
          if (key === 'ctrlk' && event.key === 'k' && event.ctrlKey) {
            event.preventDefault();
          }
  
          // check if 'key' in 'keys' is equal to keyboard event code
          // if not, check if 'ctrlKey' or 'altKey' or 'shiftKey' keyboard event is true
          // and if the last section of 'key' string is equal to event key
          if (event.code === key) {
            callbackRef.current(event);
          } else if (
            (event.key === key.slice(-1) && event.ctrlKey) ||
            (event.key === key.slice(-1) && event.altKey) ||
            (event.key === key.slice(-1) && event.shiftKey)
          ) {
            callbackRef.current(event);
          }
        });
      },
      [keys]
    );
  
    useEffect(() => {
      // target is either the provided node or the document
      const targetNode = node ?? document;
      // attach the event listener
      targetNode && targetNode.addEventListener('keydown', handleKeyPress);
  
      // remove the event listener
      return () =>
        targetNode && targetNode.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress, node]);
  };