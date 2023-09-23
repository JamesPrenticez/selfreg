import {  useCallback, useState, useEffect, useRef, type RefObject,} from "react";

// export function useCaretPosition<
//   T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
// >() {
//   const node = useRef<T>(null);
//   const [start, setStart] = useState(0);
//   const [end, setEnd] = useState(0);

//   const updateCaret = useCallback(() => {
//     if (node.current) {
//       const { selectionStart, selectionEnd } = node.current;

//       setStart(selectionStart!);
//       setEnd(selectionEnd!);
//     }
//   }, []);

//   useEffect(() => {
//     if (node.current) {
//       node.current.setSelectionRange(start, end);
//     }
//   });

//   return { start, end, ref: node, updateCaret };
// }

type RefType<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> = RefObject<T>;

export function useCursorPosition<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(ref: RefType<T>) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [realCursorPosition, setRealCursorPosition] = useState(0);

  const updateCaret = useCallback(() => {
    console.log("fire")
    // Use a timeout to delay the reading of selectionStart and selectionEnd
    const timeoutId = setTimeout(() => {
      if (ref.current) {
        const { selectionStart, selectionEnd } = ref.current;
        setStart(selectionStart!);
        setEnd(selectionEnd!);
      }
    }, 0);

    // Return a cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      ref.current.setSelectionRange(start, end);
      setRealCursorPosition(ref.current.value.length - start)
    }
  }, [start, end, ref]);

  return { realCursorPosition, start, end, updateCaret };
}

export const setCaretPosition = (ref: RefObject<HTMLInputElement>, position: number) => {
  const input = ref.current;
  if (input) {
    input.focus();
    input.setSelectionRange(position, position);
  }
};