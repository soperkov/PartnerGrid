import { MinLengthValidator } from "@angular/forms";

export const ValidationRules = {
  firstName: {
    required: true,
    minlength: 2,
    maxlength: 255,
    message: {
      required: 'First name is required.',
      minlength: 'First name must be at least 2 characters long.',
      maxlength: 'First name must be less than 255 characters long.'
    }
  },
  lastName: {
    required: true,
    minlength: 2,
    maxlength: 255,
    message: {
      required: 'Last name is required.',
      minlength: 'Last name must be at least 2 characters long.',
      maxlength: 'Last name must be less than 255 characters long.'
    }
  },
  partnerNumber: {
    required: true,
    pattern: /^\d{20}$/,
    message: {
      required: 'Partner number is required.',
      pattern: 'Partner number must be exactly 20 numeric characters.'
    }
  },
  croatianPin: {
    required: false,
    pattern: /^\d{11}$/,
    message: {
      pattern: 'Croatian PIN must be exactly 11 numeric characters.'
    }
  },
  createByUser: {
    required: true,
    pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    maxlength: 255,
    message: {
      required: 'Email address is required.',
      pattern: 'Email address must be valid.',
      maxlength: 'Email must not exceed 255 characters.'
    }
  },
  partnerTypeId: {
    required: true,
    allowedValues: [1, 2],
    message: {
      required: 'Partner type is required.',
      allowedValues: 'Partner type must be either 1 (Personal) or 2 (Legal).'
    }
  },
  isForeign: {
    required: true,
    message: {
      required: 'Please select if the partner is foreign or not.'
    }
  },
  externalCode: {
    required: false,
    minlength: 10,
    maxlength: 20,
    message: {
      minlength: 'External code should have minimum of 10 characters.',
      maxlength: 'External code should have maximum of 20 characters.'
    }
  },
  gender: {
    required: true,
    allowedValues: ['M', 'F', 'N'],
    message: {
      required: 'Gender is required.',
      allowedValues: 'Gender must be M (Male), F (Female), or N (Non-binary).'
    }
  }
};
