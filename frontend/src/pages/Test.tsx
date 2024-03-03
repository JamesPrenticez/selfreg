import React from 'react';
import { downloadCSV, uploadCSV, useLocalStorage } from '@hooks/useLocalStorage';
import { mockHabits } from '@mocks';
import { Button } from '@components/common';

const MyComponent = () => {
  const [name, setName] = useLocalStorage<string>('name', '');

  const [data, setData] = React.useState<any[]>([]); 

  const handleDownload = () => {
    // Assuming `data` is the state you want to download
    downloadCSV(data, 'my-state');
  };

  return (
    <div className='text-white'>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello, {name}!</p>


      <Button className='bg-orange-500 text-white' onClick={() => { setData(mockHabits)}}>
        set data
      </Button>

{JSON.stringify(data, null, 2)}

      <div>
      <Button className='bg-green-500 text-white' onClick={handleDownload}>Download State as CSV</Button>
      <input type="file" accept=".csv" onChange={uploadCSV} />
    </div>
    </div>



  );
};

export default MyComponent;
