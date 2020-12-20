import { redirectToPage } from "../utils";
import { set } from "../context";
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
    return;
  }
  //save values to db
  const user = extractFormValues(form);
  console.log(user);
  const foundUser =
    users.find("userName", user.userName) ||
    users.find("emailId", user.userName) ||
    users.find("mobileNo", user.userName);

  if (!foundUser) {
    showValidationMessage(form, "User not found. please register to login.");
    return;
  }
  //check for password
  if (foundUser.password !== user.password) {
    showValidationMessage(form, "passwords do not match. Try again.");
    return;
  }
  set("user", foundUser);
  redirectToPage("search");
};
