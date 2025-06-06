export interface CreditCardValidation {
  isValid: boolean;
  errors: {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    amount?: string;
  };
  cardType?: 'visa' | 'mastercard' | 'unknown';
}

const CARD_PATTERNS = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$/,
};

export function validateCreditCardPayment(
  cardNumber: string,
  expiryDate: string,
  cvv: string,
  amount: string
): CreditCardValidation {
  const errors: CreditCardValidation['errors'] = {};
  let isValid = true;
  let cardType: 'visa' | 'mastercard' | 'unknown' = 'unknown';

  // Remove spaces and non-digit characters for validation
  const cleanCardNumber = cardNumber.replace(/\D/g, '');

  // Card Number Validation
  if (!cleanCardNumber) {
    errors.cardNumber = 'Card number is required';
    isValid = false;
  } else {
    // Check card type
    if (CARD_PATTERNS.visa.test(cleanCardNumber)) {
      cardType = 'visa';
    } else if (CARD_PATTERNS.mastercard.test(cleanCardNumber)) {
      cardType = 'mastercard';
    }

    // Luhn algorithm validation
    let sum = 0;
    let isEven = false;
    
    // Loop through values starting from the rightmost digit
    for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanCardNumber.charAt(i));

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    if (sum % 10 !== 0) {
      errors.cardNumber = 'Invalid card number';
      isValid = false;
    } else if (cardType === 'unknown') {
      errors.cardNumber = 'Only Visa and Mastercard are supported';
      isValid = false;
    }
  }

  // Expiry Date Validation
  if (!expiryDate) {
    errors.expiryDate = 'Expiry date is required';
    isValid = false;
  } else {
    const [month, year] = expiryDate.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (isNaN(month) || isNaN(year)) {
      errors.expiryDate = 'Invalid expiry date format';
      isValid = false;
    } else if (month < 1 || month > 12) {
      errors.expiryDate = 'Invalid month';
      isValid = false;
    } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.expiryDate = 'Card has expired';
      isValid = false;
    }
  }

  // CVV Validation
  if (!cvv) {
    errors.cvv = 'CVV is required';
    isValid = false;
  } else {
    const cleanCvv = cvv.replace(/\D/g, '');
    if (cleanCvv.length < 3 || cleanCvv.length > 4) {
      errors.cvv = 'CVV must be 3 or 4 digits';
      isValid = false;
    }
  }

  // Amount Validation
  if (!amount) {
    errors.amount = 'Amount is required';
    isValid = false;
  } else {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      errors.amount = 'Invalid amount';
      isValid = false;
    } else if (numAmount <= 0) {
      errors.amount = 'Amount must be greater than 0';
      isValid = false;
    } else if (numAmount > 100000) {
      errors.amount = 'Amount cannot exceed ₹100,000';
      isValid = false;
    }
  }

  return {
    isValid,
    errors,
    cardType,
  };
}