export const getPriceFromNumber = (price: string) => {
  const MINIMUM_NUMBER_OF_DIGITS = 3;

  if (price.length >= MINIMUM_NUMBER_OF_DIGITS) {
    const lastDigits = price.slice(-MINIMUM_NUMBER_OF_DIGITS);
    const firstDigits = price.slice(0, -MINIMUM_NUMBER_OF_DIGITS);
    const finalPrice = `$${firstDigits.concat(".", lastDigits)}`;
    return finalPrice;
  }

  return `$${price}`;
};
