export function getCardInfo (number) {
  if (number.startsWith('4')) {
    return { type: 'Visa', isValidLength: number.length === 13 || number.length === 16 };
  }
  if (/^5[1-5]/.test(number)) {
    return { type: 'MasterCard', isValidLength: number.length === 16 };
  }
  if (/^6011|^65/.test(number)) {
    return { type: 'Discover', isValidLength: number.length === 16 };
  }
  return { type: '', isValidLength: false };
};