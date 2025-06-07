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

// Bank Account Validation
export function validateBankAccount(accountNumber: string, ifscCode: string): { isValid: boolean; errors: { accountNumber?: string; ifscCode?: string } } {
  const errors: { accountNumber?: string; ifscCode?: string } = {};
  let isValid = true;

  // Account Number Validation (9-18 digits)
  if (!accountNumber) {
    errors.accountNumber = 'Account number is required';
    isValid = false;
  } else if (!/^\d{9,18}$/.test(accountNumber)) {
    errors.accountNumber = 'Account number must be 9-18 digits';
    isValid = false;
  }

  // IFSC Code Validation (11 characters: 4 letters + 7 alphanumeric)
  if (!ifscCode) {
    errors.ifscCode = 'IFSC code is required';
    isValid = false;
  } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode.toUpperCase())) {
    errors.ifscCode = 'Invalid IFSC code format';
    isValid = false;
  }

  return { isValid, errors };
}

// Electricity Consumer Number Validation
export function validateConsumerNumber(consumerNumber: string): { isValid: boolean; error?: string } {
  if (!consumerNumber) {
    return { isValid: false, error: 'Consumer number is required' };
  }
  
  // Most electricity boards use 6-12 digit consumer numbers
  if (!/^\d{6,12}$/.test(consumerNumber)) {
    return { isValid: false, error: 'Consumer number must be 6-12 digits' };
  }

  return { isValid: true };
}

// Vehicle Number Validation (Indian format)
export function validateVehicleNumber(vehicleNumber: string): { isValid: boolean; error?: string } {
  if (!vehicleNumber) {
    return { isValid: false, error: 'Vehicle number is required' };
  }

  // Indian vehicle number format: AA11AA1111 or AA11A1111
  const pattern = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
  if (!pattern.test(vehicleNumber.toUpperCase())) {
    return { isValid: false, error: 'Invalid vehicle number format' };
  }

  return { isValid: true };
}

// DTH Subscriber ID Validation
export function validateDthSubscriberId(subscriberId: string): { isValid: boolean; error?: string } {
  if (!subscriberId) {
    return { isValid: false, error: 'Subscriber ID is required' };
  }

  // DTH subscriber IDs are typically 10-12 digits
  if (!/^\d{10,12}$/.test(subscriberId)) {
    return { isValid: false, error: 'Subscriber ID must be 10-12 digits' };
  }

  return { isValid: true };
}

// Mobile Number Validation
export function validateMobileNumber(mobileNumber: string): { isValid: boolean; error?: string } {
  if (!mobileNumber) {
    return { isValid: false, error: 'Mobile number is required' };
  }

  // Indian mobile number format: 10 digits starting with 6-9
  if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
    return { isValid: false, error: 'Invalid mobile number format' };
  }

  return { isValid: true };
}

// Amount Validation
export function validateAmount(amount: string): { isValid: boolean; error?: string } {
  if (!amount) {
    return { isValid: false, error: 'Amount is required' };
  }

  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Invalid amount' };
  }

  if (numAmount <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0' };
  }

  if (numAmount > 100000) {
    return { isValid: false, error: 'Amount cannot exceed ₹100,000' };
  }

  return { isValid: true };
}

//  default export
export default {
  validateBankAccount,
  validateConsumerNumber,
  validateVehicleNumber,
  validateDthSubscriber: validateDthSubscriberId,
  validateMobileNumber,
  validateAmount,
};