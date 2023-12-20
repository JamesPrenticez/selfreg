


const getValue = (value, position) => {
  const index = (value.length - 1) - position
  return value.charAt(index);
};

const getValue2 = (value, position) => {
  console.log(value.length)

  for(let i  = 0; i <= value.length; i++){
    value.slice(i - 1, i)

  }

  return value.slice(position + (value.length - 1), value.length )
};

// console.log(getValue2("James", 2))

// ===================================================

let stringNum = "987654"
let position = 0

// var iterations = 100;
// console.time('Function #1');
// for(var i = 0; i < iterations; i++ ){
//   getValue(stringNum, position)
// };
// console.timeEnd('Function #1')

// console.time('Function #2');
// for(var i = 0; i < iterations; i++ ){
//   getValue2(stringNum, position)
// };
// console.timeEnd('Function #2')

// console.log(getValue(stringNum, position))
  getValue2(stringNum, position)