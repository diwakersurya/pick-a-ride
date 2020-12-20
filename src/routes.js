import { set } from "./context";
import { redirectToPage, validateLogin } from "./utils";
export const routes = {
  "#login": "login",
  "#register": "register",
  "#search": "search"
};

window.addEventListener("hashchange", function () {
  console.log("hashchange event");
  showPage(window);
});

window.addEventListener("DOMContentLoaded", function (ev) {
  console.log("DOMContentLoaded event");
  showPage(window);
});

function showPage(scope) {
  var theHash = window.location.hash;
  if (theHash.length === 0) {
    theHash = "#login";
  }
  // if (!validateLogin(theHash) && theHash !== "#login") {
  //   return redirectToPage("login");
  // }
  const pages = document.querySelectorAll("[data-page]");
  console.log(theHash);
  for (let i = 0; i < pages.length; i++) {
    const { onUnmount } = pages[i].dataset;
    if (onUnmount && typeof scope["custom"][onUnmount] === "function") {
      scope["custom"][onUnmount](pages[i]);
    }
    pages[i].classList.add("u-hide");
  }
  const activePageSelector = routes[theHash];
  // console.log({ activePageSelector });
  try {
    var page = document.querySelector(`[data-page="${activePageSelector}"]`);
    page.classList.remove("u-hide");
    //find onMount function
    const { onMount } = page.dataset;
    if (onMount && typeof scope["custom"][onMount] === "function") {
      scope["custom"][onMount](page);
    }
    set("currentPage", page);
  } catch {
    console.error(`route ${activePageSelector} does not exist in applicaiton.`);
  }
  // page.classList.add("u-show");
  return true;
}

showPage(window);
