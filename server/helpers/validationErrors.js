const validationErrors = {
	fnameRequired: "Sorry! the first name field is required",
	lnameRequired: "Sorry! the last name field is required",
  ownerRequired: "Sorry! the owner Id is required",
  accountTypeRequired: "Sorry! account type is required",
	validNumber: "Please your phone number can only contain numbers and cannot be greater than 15 or less than 8 characters",
	fnameLength: "Sorry your first name cannot be less than 2 characters.",
	validFName: "Please enter a valid first name. Names can only contain letters.",
	validLName: "Please enter a valid last name. Names can only contain letters.",
	validPassword: "Sorry, your password cannot contain spaces.",
	validEmail: "Please enter a valid email address.",
  ownerId: "Owner Id should be an integer",
	lnameLength: "Sorry your last name cannot be less than 2 characters.",
	emailRequired: "Sorry, the Email field is required",
	passwordLength: "Sorry, your password must not be less than 5 characters",
	emailExists: "Sorry, this email address has already been registered",
  accountExists: "Sorry, this user already has an account",
	passwordEmpty: "Your password is required",
	validType: "Please enter a valid type. The type can only be savings or current",
  loginFailure: 'Could not login. The email and password do not match',
  noEmail: 'Could not login. The email and password do not match',
  loginRequired: 'Sorry, both your email and password are required',
};

export default validationErrors;