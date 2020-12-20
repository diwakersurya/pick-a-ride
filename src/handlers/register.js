import { redirectToPage } from "../utils";
import {
  clearValidationMessage,
  validate,
  showValidationMessage,
  extractFormValues
} from "./helpers";
import * as users from "../db/users";

export const submit = (e) => {
  e.preventDefault();
  const form = e.target;
  clearValidationMessage(form);
  const [valid, _, message] = validate(form);
  if (!valid) {
    showValidationMessage(form, message);
  }
  //save values to db
  const user = extractFormValues(form);
  console.log(user);
  users.add(user);
  redirectToPage("login");
};
