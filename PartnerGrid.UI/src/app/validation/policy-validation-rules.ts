export const PolicyValidationRules = {
  policyNumber: {
    required: true,
    minlength: 10,
    maxlength: 15,
    message: {
      required: 'Policy number is required.',
      minlength: 'Policy number must be at least 10 characters long.',
      maxlength: 'Policy number must be at most 15 characters long.'
    }
  },
  policyAmount: {
    required: true,
    message: {
      required: 'Policy amount is required.'
    }
  }
};
