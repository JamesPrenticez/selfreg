import React from 'react';

interface Props {
  unified: string;
  size: string | number;
}

function EmojiWrapper ({unified, size}: Props){

  function unifiedToText(unified: string): string {
    const codePoints = unified.split('-').map((hex) => parseInt(hex, 16));
    return String.fromCodePoint(...codePoints);
  }

  const emojiText = unifiedToText(unified)

  return (
    <p
      className='pointer-events-none select-none'
      role="img"
      aria-label={"emoji"}
      data-unified={emojiText}
      style={{ fontSize: size }}
    >
      {emojiText ? emojiText : null}
    </p>
)};

export default EmojiWrapper;