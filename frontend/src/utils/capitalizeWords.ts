export function capitalizeWords(input: string | undefined): string {
  if (input === undefined || input === null) {
    return ''; // Handle undefined or null input
  }

  return input
    .split(' ') // Split the input string into an array of words
    .map((word) => {
      // For each word in the array, capitalize the first letter and keep the rest lowercase
      if (word.length === 0) {
        return ''; // Handle empty words
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' '); // Join the modified words back into a single string
}

// Example usage:
// const inputString = "hello world";
// const capitalizedString = capitalizeWords(inputString);
// console.log(capitalizedString); // Output: "Hello World"