import React, { useState, useEffect, type ReactElement } from 'react';

const generateFakeObjectId = (): string => {
  let hexString = '';
  for (let i = 0; i < 24; i++) {
    hexString += Math.floor(Math.random() * 16).toString(16);
  }
  return hexString;
};

function Admin(): ReactElement {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const newIds: string[] = [];
    for (let i = 0; i < 5; i++) {
      newIds.push(generateFakeObjectId());
    }
    setIds(newIds);
  }, []);

  return (
    <div>
      <h1>Generated Object IDs</h1>
      <ul>
        {ids.map((id, index) => (
          <li key={index}>{id}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;