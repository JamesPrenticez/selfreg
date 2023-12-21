import React, { useState, useEffect, type ReactElement } from 'react';
import { generateFakeObjectId } from '@utils';

function Admin(): ReactElement {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const newIds: string[] = [];
    for (let i = 0; i < 50; i++) {
      newIds.push(generateFakeObjectId());
    }
    setIds(newIds);
  }, []);

  return (
    <div className='text-primary'>
      <h1 className='text-2xl font-bold'>Generated Object IDs</h1>
      <ul>
        {ids.map((id, index) => (
          <li key={index}>{index} - {id}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;