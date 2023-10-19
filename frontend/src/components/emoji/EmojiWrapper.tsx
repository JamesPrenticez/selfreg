import React from 'react';

interface Props {
  unified: string;
  size: number | string;
}

function EmojiWrapper ({unified, size="16px"}: Props){

  function unifiedToText(unified: string): string {
    const codePoints = unified.split('-').map((hex) => parseInt(hex, 16));
    return String.fromCodePoint(...codePoints);
  }

  const emojiText = unifiedToText(unified)

  return (
    <span
      className=""
      style={{
        fontSize: size
      }}
      role="img"
      aria-label={"emoji"}
      data-unified={emojiText}
    >
      {emojiText ? emojiText : null}
    </span>
)};

export default EmojiWrapper;