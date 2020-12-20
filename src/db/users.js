import * as storage from "./storage";
export const add = (user) => {
  return storage.add("users", user);
};
export const remove = (id) => {
  return storage.remove("users", id);
};
export const find = (field, value) => {
  return storage.find("users", field, value);
};
