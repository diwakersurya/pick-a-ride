import * as storage from "./storage";
import { tripsData } from "./tripData";
export const search = (from, to) => {
  return storage.query("trips", { from, to });
};
export const find = (id) => {
  return storage.read("trips", id);
};

//update seed data in localstorage
storage.load("trips", tripsData);
