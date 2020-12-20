import { get, set } from "./context";
const nonAuthRoutes = ["#login", "#register"];
export const getNewUrl = (slug) => {
  const urlWithoutSlug = window.location.href.split("#").reverse().pop();
  return [urlWithoutSlug, slug].join("#");
};

export const redirectToPage = (slug) => {
  window.location = getNewUrl(slug);
};
export const isEmpty = (elem) => {
  return !!elem.firstChild;
};
export const validateLogin = (page) => {
  if (nonAuthRoutes.includes(page)) {
    return true;
  }
  if (get("user")) {
    return true;
  }
  return false;
};
