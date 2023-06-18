import { TIMEOUT_SECONDS } from "./config";
import recipeView from "./views/recipeView";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // console.log(url);

    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok) throw Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    // console.log(url);
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok) throw Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
// adding function to convert fracion into decimal
export function decimalToFraction(decimal) {
  // Check if the input is a valid number
  if (typeof decimal !== "number") {
    throw new Error("Invalid input. Please provide a valid decimal number.");
  }

  // Check if the decimal is zero or a whole number
  if (decimal === 0 || Number.isInteger(decimal)) {
    return decimal.toString();
  }

  // Get the absolute value of the decimal
  const absolute = Math.abs(decimal);

  // Calculate the denominator by finding the power of 10 needed to convert the decimal to a whole number
  let denominator = 1;
  while (Number.isInteger(absolute * denominator) === false) {
    denominator *= 10;
  }

  // Calculate the numerator by multiplying the decimal by the denominator
  const numerator = absolute * denominator;

  // Find the greatest common divisor (gcd) between the numerator and denominator
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(numerator, denominator);

  // Simplify the fraction by dividing both the numerator and denominator by the gcd
  const simplifiedNumerator = numerator / divisor;
  const simplifiedDenominator = denominator / divisor;

  // Determine the sign of the fraction
  const sign = decimal < 0 ? "-" : "";

  // Return the fraction as a string
  return sign + simplifiedNumerator + "/" + simplifiedDenominator;
}

// Example usage
// console.log(decimalToFraction(0.75));  // Output: '3/4'
// console.log(decimalToFraction(1.25));  // Output: '5/4'
// console.log(decimalToFraction(-0.5));  // Output: '-1/2'
// console.log(decimalToFraction(1));     // Output: '1'
// console.log(decimalToFraction(0));     // Output: '0'
// console.log(decimalToFraction(-2));    // Output: '-2'
