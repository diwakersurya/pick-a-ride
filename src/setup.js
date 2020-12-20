import * as register from "./handlers/register";
import * as login from "./handlers/login";
import * as search from "./handlers/search";
import { isEmpty } from "./utils";
import { set, get } from "./context";

function mountRegister(page) {
  console.log("register page mounted");
  //attach event handlers to form
  const form = page.querySelector("[name='register']");
  if (form) {
    //add submit event listener
    form.addEventListener("submit", register.submit);
  }
}
function unMountRegister(page) {
  console.log("register page unmounted");
  const form = page.querySelector("[name='register']");
  if (form) {
    //add submit event listener
    form.removeEventListener("submit", register.submit);
  }
}

function mountLogin(page) {
  console.log("login page mounted");
  //attach event handlers to form
  const form = page.querySelector("[name='login']");
  if (form) {
    //add submit event listener
    form.addEventListener("submit", login.submit);
  }
}
function unMountLogin(page) {
  console.log("login page unmounted");
  const form = page.querySelector("[name='login']");
  if (form) {
    //add submit event listener
    form.removeEventListener("submit", login.submit);
  }
}

function mountSearch(page) {
  if (!get("map")) {
    console.log("initialising map.");
    var map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      controls: [],
      view: new ol.View({
        center: ol.proj.fromLonLat([77.59369, 12.97194]),
        zoom: 11
      })
    });
    set("map", map);
  }
  console.log("search page mounted");
  //attach event handlers to form
  const source = page.querySelector("[name='source']");
  if (source) {
    //add submit event listener
    source.addEventListener("input", search.query);
  }
  const destination = page.querySelector("[name='destination']");
  if (destination) {
    //add submit event listener
    source.addEventListener("input", search.query);
  }
  const confirmButton = page.querySelector(".confirmRide");
  if (confirmButton) {
    confirmButton.addEventListener("click", search.confirmRide);
  }
}
function unMountSearch(page) {
  console.log("search page unmounted");
  const source = page.querySelector("[name='source']");
  if (source) {
    //add submit event listener
    source.removeEventListener("input", search.query);
  }
  const destination = page.querySelector("[name='destination']");
  if (destination) {
    //add submit event listener
    source.removeEventListener("input", search.query);
  }
}

(function setup(scope) {
  scope["custom"] = scope["custom"] || {};
  [
    mountRegister,
    unMountRegister,
    mountLogin,
    unMountLogin,
    mountSearch,
    unMountSearch
  ].forEach((func) => {
    scope["custom"][func.name] = func;
  });
})(window);
