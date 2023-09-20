import React, { useState, useEffect, ReactElement } from 'react';
import { useFocusBlur } from '../../hooks';

function Test(): ReactElement {
  const {
    inputRef,
    containerRef,
    isActive,
    setIsActive,
    handleBlur
  } = useFocusBlur(false);

  const [inputValue, setInputValue] = useState<string>("");
  const [placeholderValue, setPlaceholderValue] = useState<string>("123456");



  useEffect(() => {
    if (isActive) {
      inputValue === "" ? setPlaceholderValue("123456") : setPlaceholderValue(inputValue)
      setInputValue('');
    }

    if (!isActive) {
      inputValue === "" ? setInputValue(placeholderValue) : setPlaceholderValue("123456")
    }

  }, [isActive]);

  // onKey press backspace
  // if(isActive) {setInputValue("") }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d+$/;
  
    if (value === '') {
      setInputValue('');
    } else if (regex.test(value) || value === '0') {
      if (value.length > 6) {
        // Remove the first character if the length exceeds 6
        const newValue = value.substring(1);
        setInputValue(newValue);
      } else {
        setInputValue(value);
      }
    }
  };
  
  const getInputValue = (index: number) => {
    return inputValue.charAt(index) || '0';
  };

  const getPlaceHolderValue = (index: number) => {
    return placeholderValue.charAt(index) || '0';
  };

  // Function to get the style based on whether the character is user-entered or a padding character
  const getStyle = (index: number) => {
    return inputValue.charAt(index) ? { color: 'green' } : { color: 'red' };
  };

 return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 space-y-2">

        <div
          id="container"
          ref={containerRef}
          className={`"
            relative w-[500px] text-6xl rounded-md p-2 font-black"
            ${inputValue.length > 0 ? "bg-green-300" : "bg-pink-300"}`
          }
          
          onClick={() => setIsActive(true)}
        >

          { inputValue.length > 0 ? (
              <div>
                <p>p1 = <span style={getStyle(inputValue.length - 6)}>{getInputValue(inputValue.length - 6)}</span></p>
                <p>p2 = <span style={getStyle(inputValue.length - 5)}>{getInputValue(inputValue.length - 5)}</span></p>
                <p>p3 = <span style={getStyle(inputValue.length - 4)}>{getInputValue(inputValue.length - 4)}</span></p>
                <p>p4 = <span style={getStyle(inputValue.length - 3)}>{getInputValue(inputValue.length - 3)}</span></p>
                <p>p5 = <span style={getStyle(inputValue.length - 2)}>{getInputValue(inputValue.length - 2)}</span></p>
                <p>p6 = <span style={getStyle(inputValue.length - 1)}>{getInputValue(inputValue.length - 1)}</span></p>
              </div>
            ) : (
              <div>
                <p>p1 = <span className='text-gray-300'>{getPlaceHolderValue(placeholderValue.length - 6)}</span></p>
                <p>p2 = <span className='text-gray-300'>{getPlaceHolderValue(placeholderValue.length - 5)}</span></p>
                <p>p3 = <span className='text-gray-300'>{getPlaceHolderValue(placeholderValue.length - 4)}</span></p>
                <p>p4 = <span className='text-gray-300'>{getPlaceHolderValue(placeholderValue.length - 3)}</span></p>
                <p>p5 = <span className='text-gray-300'>{getPlaceHolderValue(placeholderValue.length - 2)}</span></p>
                <p>p6 = <span className='text-gray-300'>{getPlaceHolderValue(placeholderValue.length - 1)}</span></p>
              </div>
            )
          }

        </div>

        <input
            ref={inputRef}
            type="tel"
            pattern="\d*"
            value={inputValue ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-red-300"
          />


      </div>
    </div>
  );
}

export default Test;
