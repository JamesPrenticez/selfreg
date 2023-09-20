import React, { useState, useEffect, ReactElement } from 'react';
import { useFocusBlur } from '../../hooks';

type Timer = ReturnType<typeof setTimeout>;

function MyCountdown(): ReactElement {
  const {
    inputRef,
    containerRef,
    isActive,
    setIsActive,
    handleBlur
  } = useFocusBlur(false);

  const [inputValue, setInputValue] = useState<string>("");
  const [prevInputValue, setPrevInputValue] = useState<string>("000500");
  const [convertedValue, setConvertedValue] = useState<any>(null)
  const [convertedArray, setConvertedArray] = useState<Array<string>>([])
  const [activeIndex, setActiveIndex] = useState<number>(5)

  const [textArray, setTextArray] = useState<Array<string>>([])


  // Update timeArry when inputValue get changed
  // useEffect(() => {
  //   const timeArray = normalizeTimeString(inputValue)
  //   setConvertedArray(timeArray)
  // },[inputValue])

  // Focus the hidden input when isActive
  // useEffect(() => {
  //   if (isActive && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [isActive]);

  // String to flipped Array
  useEffect(() => {
    setTextArray(inputValue.split(""))
  }, [inputValue])


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

  function normalizeTimeString(timeString: string): Array<string> {
    // Pad the string with leading zeros to make it of length 6
    const paddedString = timeString.padStart(6, '0');

    // Extract hours, minutes, and seconds from the string
    let hours = parseInt(paddedString.substring(0, 2), 10);
    let minutes = parseInt(paddedString.substring(2, 4), 10);
    let seconds = parseInt(paddedString.substring(4, 6), 10);

    // Cap the initial hours to its maximum
    if (hours > 99) {
      hours = 99;
    }

    // Normalize the time
    let normalizedMinutes = minutes + Math.floor(seconds / 60);
    let normalizedSeconds = seconds % 60;

    let normalizedHours = hours + Math.floor(normalizedMinutes / 60);
    normalizedMinutes %= 60;

    // Cap the normalized hours to its maximum
    if (normalizedHours > 99) {
      normalizedHours = 99;
      normalizedMinutes = 59;
      normalizedSeconds = 59;
    }

    // Construct the normalized time string
    // not needed
    const normalizedTimeString = `${normalizedHours}hrs ${normalizedMinutes}mins ${normalizedSeconds}secs`;
    setConvertedValue(normalizedTimeString)

    // Convert to strings and pad with leading zeros
    const hoursStr = String(normalizedHours).padStart(2, '0');
    const minutesStr = String(normalizedMinutes).padStart(2, '0');
    const secondsStr = String(normalizedSeconds).padStart(2, '0');
    const normalizedTimeArray = [...hoursStr, ...minutesStr, ...secondsStr];
    // setConvertedArray(normalizedTimeArray)
    // Create the array
    return normalizedTimeArray
  }

  const updateInputValueAtIndex = () => {}
  
  const handleClickOnNumber = () => {}
  
  const handleLeftRightKeyboard = () => {}


  const spanStyle = "border-transparent"
  const cursorStyle = "r-2 border-black"

  const getValue = (index: number) => {
    return inputValue.charAt(index) || '0';
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
          className="relative bg-green-300 w-[500px] text-6xl rounded-md p-2 font-black"
          onClick={() => setIsActive(true)}
        >

          <span className={`border-r-2 ${activeIndex === 0 ? "border-black" : "border-transparent"}`} onClick={() => setActiveIndex(0)}>{textArray[0]}</span>
          <span className={`border-r-2 ${activeIndex === 1 ? "border-black" : "border-transparent"}`} onClick={() => setActiveIndex(1)}>{textArray[1]}</span>
          <span>h&nbsp;</span>

          <span className={`border-r-2 ${activeIndex === 2 ? "border-black" : "border-transparent"}`} onClick={() => setActiveIndex(2)}>{textArray[2]}</span>
          <span className={`border-r-2 ${activeIndex === 3 ? "border-black" : "border-transparent"}`} onClick={() => setActiveIndex(3)}>{textArray[3]}</span>
          <span>m&nbsp;</span>

          <span className={`border-r-2 ${activeIndex === 4 ? "border-black" : "border-transparent"}`} onClick={() => setActiveIndex(4)}>{textArray[4]}</span>
          <span className={`border-r-2 ${activeIndex === 4 ? "border-black" : "border-transparent"}`} onClick={() => setActiveIndex(4)}>{textArray[5]}</span>
          <span>s&nbsp;</span>

          <p>p1 = <span style={getStyle(inputValue.length - 6)}>{getValue(inputValue.length - 6)}</span></p>
          <p>p2 = <span style={getStyle(inputValue.length - 5)}>{getValue(inputValue.length - 5)}</span></p>
          <p>p3 = <span style={getStyle(inputValue.length - 4)}>{getValue(inputValue.length - 4)}</span></p>
          <p>p4 = <span style={getStyle(inputValue.length - 3)}>{getValue(inputValue.length - 3)}</span></p>
          <p>p5 = <span style={getStyle(inputValue.length - 2)}>{getValue(inputValue.length - 2)}</span></p>
          <p>p6 = <span style={getStyle(inputValue.length - 1)}>{getValue(inputValue.length - 1)}</span></p>


          {/* {textArray.length = 5) ? (
            <span className={`text-green-500 border-r-2 ${activeIndex === 5 ? "border-black" : "border-transparent"}`} onClick={() => setActiveIndex(5)}>
              {textArray[0]}
            </span>
          ) : (
            <span className={`text-red-500 border-r-2 ${activeIndex === 5 ? "border-black" : "border-transparent"}`} onClick={() => setActiveIndex(5)}>
              {prevInputValue.charAt(5)}
            </span>
          )} */}
          

        </div>





        
        <input
            ref={inputRef}
            type="tel"
            pattern="\d*"
            // minLength={0}
            // maxLength={6}
            value={inputValue ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-red-300"
            // absolute top-0 left-0 opacity-0 -z-50
          />

        <div className='flex'>
          <button 
            className="text-2xl bg-blue-500 text-white rounded-md px-8 py-2 ml-auto"
            onClick={() => {normalizeTimeString(inputValue)}}>
              Convert
          </button>
        </div>

        <div className='bg-gray-200'>
          <p>inputValue: {inputValue}</p>
          <p>prevInputValue: {prevInputValue}</p>
          <p>isActive: {JSON.stringify(isActive)}</p>
          <p>{convertedValue}</p>
          <p>{JSON.stringify(convertedArray)}</p>
          <p>textArray: {JSON.stringify(textArray)}</p>
        </div>

      </div>
    </div>
  );
}

export default MyCountdown;


// const [isEditing, setIsEditing] = useState<boolean>(false); // New state
// onFocus={() => setIsEditing(true)} // Set isEditing to true when focused
// onBlur={() => setIsEditing(false)} // Set isEditing to false when focus is lost
// placeholder={inputValue}
// className={`text-center w-64 ${isEditing ? "flex" : "hidden"}`}


// function normalizeTimeString(timeString: string): string {
//   // Pad the string with leading zeros to make it of length 6
//   const paddedString = timeString.padStart(6, '0');

//   // Extract hours, minutes, and seconds from the string
//   let hours = parseInt(paddedString.substring(0, 2), 10);
//   let minutes = parseInt(paddedString.substring(2, 4), 10);
//   let seconds = parseInt(paddedString.substring(4, 6), 10);

//   // Cap the initial values to their maximums
//   if (hours > 99) {
//     hours = 99;
//   }
//   if (minutes > 59) {
//     minutes = 59;
//   }
//   if (seconds > 59) {
//     seconds = 59;
//   }

//   // Normalize the time
//   let normalizedMinutes = minutes + Math.floor(seconds / 60);
//   let normalizedSeconds = seconds % 60;

//   let normalizedHours = hours + Math.floor(normalizedMinutes / 60);
//   normalizedMinutes %= 60;

//   // Construct the normalized time string
//   const normalizedTimeString = `${normalizedHours}hrs ${normalizedMinutes}mins ${normalizedSeconds}secs`;

//   return normalizedTimeString;
// }


/// ========== 60

// function normalizeTimeString(timeString: string): void {
//   // Pad the string with leading zeros to make it of length 6
//   const paddedString = timeString.padStart(6, '0');

//   // Extract hours, minutes, and seconds from the string
//   let hours = parseInt(paddedString.substring(0, 2), 10);
//   let minutes = parseInt(paddedString.substring(2, 4), 10);
//   let seconds = parseInt(paddedString.substring(4, 6), 10);

//   // Cap the initial hours to its maximum
//   if (hours > 99) {
//     hours = 99;
//   }

//   // Normalize the time
//   let normalizedMinutes = minutes + Math.floor(seconds / 60);
//   let normalizedSeconds = seconds % 60;

//   let normalizedHours = hours + Math.floor(normalizedMinutes / 60);
//   normalizedMinutes %= 60;

//   // Cap the normalized hours to its maximum
//   if (normalizedHours > 99) {
//     normalizedHours = 99;
//     normalizedMinutes = 60;
//     normalizedSeconds = 60;
//   }

//   // Construct the normalized time string
//   const normalizedTimeString = `${normalizedHours}hrs ${normalizedMinutes}mins ${normalizedSeconds}secs`;
//   setConvertedValue(normalizedTimeString)

//   // Convert to strings and pad with leading zeros
//   const hoursStr = String(normalizedHours).padStart(2, '0');
//   const minutesStr = String(normalizedMinutes).padStart(2, '0');
//   const secondsStr = String(normalizedSeconds).padStart(2, '0');
//   const normalizedTimeArray = [...hoursStr, ...minutesStr, ...secondsStr];
//   setConvertedArray(normalizedTimeArray)
//   // Create the array


// }