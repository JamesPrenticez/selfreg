import React, { useState } from 'react';

import EmojiPicker, {
  EmojiStyle,
  EmojiClickData,
  Emoji,
} from "emoji-picker-react";
import EmojiWrapper from './EmojiWrapper';

const EmojiSelector = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.unified);
  }

  return (
    <>
    {selectedEmoji ? <Emoji unified={selectedEmoji} size={24} /> : null}
    {selectedEmoji ?  <EmojiWrapper unified={selectedEmoji} /> : null}
    {selectedEmoji ?  <p>{selectedEmoji}</p> : null}
    
    <EmojiPicker
      onEmojiClick={onClick}
      autoFocusSearch={false}
      emojiStyle={EmojiStyle.NATIVE} // google | apple | facebook | twitter | native
      />
      </>
  )

}

//   Build custom emoji handler
//   const [searchTerm, setSearchTerm] = useState('');
//   const emojis = require('emoji.json');

//   const filteredEmojis = emojis.filter((emoji) =>
//     emoji.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="p-4">
//       <input
//         type="text"
//         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//         placeholder="Search for an emoji..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//       <div className="mt-4 grid grid-cols-4 gap-4">
//         {filteredEmojis.map((emoji) => (
//           <div
//             key={emoji.char}
//             className="flex flex-col items-center p-2 border rounded-md cursor-pointer hover:bg-gray-100"
//           >
//             <span className="text-2xl">{emoji.char}</span>
//             <span className="mt-1">{emoji.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default EmojiSelector;
