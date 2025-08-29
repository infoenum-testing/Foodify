export const validateEmail = (email) => {
  let regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // at least 6 chars with one number
  let regex = /^(?=.*[0-9]).{6,}$/;
  return regex.test(password);
};
