// Obtain 100000 (number) from "$100.000" (string)
export const getNumberFromPrice = (strPrice: string): number => {
  // Remove "$" and "." and return it as an integer

  // In houseData prices have not the symbol "$", so we need to make a difference here
  if (strPrice[0] === "$") {
    return parseInt(strPrice.substring(1).split(".").join(""));
  } else {
    return parseInt(strPrice.split(".").join(""));
  }
};
