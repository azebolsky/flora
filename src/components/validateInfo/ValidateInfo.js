export default function validateInfo(inputs) {
  let errors = {};

  if (!inputs.username) {
    errors.username = "username required";
  }

  if (!inputs.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
    errors.email = "Email address is invalid";
  }

  if (!inputs.password) {
    errors.password = "Password is required";
  } else if (inputs.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  if (!inputs.confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (inputs.confirmPassword !== inputs.password) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}
