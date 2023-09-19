export const getNumbersFromPriceRange = (
  strPrice: string
): [number, number] => {
  // If is not price range selected
  if (strPrice[0] !== "$") {
    return [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
  }

  // Remove "$" and "." and return it as an integer
  const lowerPrice = parseInt(
    strPrice.split(" ")[0].substring(1).split(".").join("")
  );
  const higherPrice = parseInt(
    strPrice.split(" ")[2].substring(1).split(".").join("")
  );

  return [lowerPrice, higherPrice];
};
