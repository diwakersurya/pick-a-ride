const required = (field) => {
  return !!field.value;
};

const minLength = (field, minLength) => {
  return field.value.length > minLength;
};

const maxLength = (field, minLength) => {
  return field.value.length < maxLength;
};

export const validations = {
  required,
  minLength,
  maxLength
};
