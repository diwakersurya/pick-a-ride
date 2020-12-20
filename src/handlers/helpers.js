import { validations } from "../validation";
export function validate(form) {
  console.log(form.querySelectorAll("input"));
  const elements = form.querySelectorAll("input");
  let valid = true;
  let invalidElement = null;
  let message = "validation error occured.";
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const failedValidation = Object.keys(validations).find((validation) => {
      if (
        typeof element.dataset[validation] !== "undefined" &&
        validations[validation] &&
        typeof validations[validation] === "function"
      ) {
        return !validations[validation](element, element.dataset[validation]);
      }
      return false;
    });
    if (failedValidation) {
      invalidElement = element;
      valid = false;
      message =
        element.getAttribute(`data-message-${failedValidation}`) ||
        "validation error occured.";
      break;
    }
  }

  return [valid, invalidElement, message];
}

export const showValidationMessage = (form, message) => {
  const errorElement = form.querySelector(".error");
  if (errorElement) {
    errorElement.innerHTML = message;
    errorElement.scrollIntoView({ behavior: "smooth" });
  }
};
export const clearValidationMessage = (form) => {
  const errorElement = form.querySelector(".error");
  if (errorElement) {
    errorElement.innerHTML = "";
  }
};

export function extractFormValues(form) {
  const inputs = form.querySelectorAll("input");
  return [...inputs].reduce((acc, input) => {
    acc[input.name] = input.value;
    return acc;
  }, {});
}
