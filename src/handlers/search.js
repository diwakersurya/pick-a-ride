import { redirectToPage } from "../utils";
import { get } from "../context";
import { search, find } from "../db/trips";
import * as longlatsDb from "../db/longlats";

let selectedItem = null;
let searchData = [];
const searchItemString = (item, selectedItem) => {
  const selected = !!selectedItem && item.id === selectedItem.id;
  return `
<div data-id="${
    item.id
  }" class="o-layout__item u-1/2 u-padding-horizontal u-padding-vertical-large searchItem ${
    selected ? "selected" : ""
  }">
  <div class="card o-layout ${selected ? "u-bg-selected" : ""}">
      <div class="o-layout__item u-3/12">
        <div class="u-padding-large">
        <img class="u-64x64"  class="user-icon" src=${
          selected ? "./assets/selected.png" : "./assets/user.png"
        }>
        </div>
      </div>
      <div class="o-layout__item u-6/12">

        <div class="u-padding-large">
          <div class="o-layout--column">
            <div><h3 class="u-bold u-inline">${
              item.user
            }</h3><label class="u-text-primary u-color-mock-dark u-padding-left-tiny  u-italic">${
    item.timeInMinutes
  } min(s) away</span></div>
            <div class="u-padding-top-tiny"><span class="u-text-primary">Route: </span><span class="u-text-primary u-bold">${
              item.from
            } to ${item.to}</span></div>
            <div class="u-padding-top-tiny"><span class="u-text-primary">Car: </span><span class="u-text-primary u-bold">${
              item.car
            }</span><span class="u-text-primary u-padding-left-tiny">Seats Available: </span><span class="u-text-primary u-padding-left-tiny u-bold">${
    item.seatAvailable
  }</span></div>
          </div>
        
        </div>
      </div>
      <div class="o-layout__item u-3/12">
      <div class="u-padding-large">${
        selected
          ? `<img class="u-64x64" src="./assets/phone.png"`
          : `<div class="u-flex">
          <span class="u-bold u-inline u-color-primary">${item.rating}</span><span class="u-padding-left-tiny u-color-mock"> | </span><img style="transform: scale(0.45);
          transform-origin: top;
      " src="./assets/star.png"/></div>`
      }
      </div>
  </div>
</div>
`;
};
function createSearchItemDom(searchItem, selectedItem) {
  return document
    .createRange()
    .createContextualFragment(searchItemString(searchItem, selectedItem));
}
function createSearchDom(data, selectedItem) {
  var frag = document.createDocumentFragment();
  for (var x = 0; x < data.length; x++) {
    const searchItemDom = createSearchItemDom(data[x], selectedItem);
    searchItemDom
      .querySelector(".searchItem")
      .addEventListener("click", select);
    frag.appendChild(searchItemDom);
  }
  return frag;
}
export const query = (e) => {
  e.preventDefault();
  const page = get("currentPage");
  const source = page.querySelector("[name='source']");
  const destination = page.querySelector("[name='destination']");
  console.log(source.value, destination.value);
  if (source.value || destination.value) {
    const sourceValue = source.value || "";
    const destinationValue = destination.value || "";
    //get matching data
    searchData = search(sourceValue, destinationValue);
  } else {
    searchData = [];
  }
  renderSearch(searchData, selectedItem);
};

export const confirmRide = (e) => {
  e.preventDefault();
  alert(`Ride details:${JSON.stringify(selectedItem, null, 2)}`);
};

const select = (e) => {
  e.preventDefault();
  const searchItemContainer = e.currentTarget;
  let id = searchItemContainer.getAttribute("data-id");
  if (id) {
    id = parseInt(id, 10);
    selectedItem = find(id);
    updateMarkersOnMap(selectedItem.from, selectedItem.to);
    renderSearch(searchData, selectedItem);
  }
};

const renderSearch = (data, selectedItem) => {
  const searchContainer = get("currentPage").querySelector(".searchResult");
  searchContainer.innerHTML = "";
  searchContainer.appendChild(createSearchDom(data, selectedItem));
};

const updateMarkersOnMap = (fromLocation, toLocation) => {
  //can be optimised
  const { long: fromLong, lat: fromLat } = longlatsDb.find(fromLocation);
  const { long: toLong, lat: toLat } = longlatsDb.find(toLocation);
  const map = get("map");
  var markers = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: "../assets/marker.png"
      })
    })
  });
  map.addLayer(markers);
  if (fromLong && fromLat) {
    var fromMarker = new ol.Feature(
      new ol.geom.Point(ol.proj.fromLonLat([fromLong, fromLat]))
    );
    markers.getSource().addFeature(fromMarker);
  }
  if (toLong && toLat) {
    var toMarker = new ol.Feature(
      new ol.geom.Point(ol.proj.fromLonLat([toLong, toLat]))
    );
    markers.getSource().addFeature(toMarker);
  }
};
