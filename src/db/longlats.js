import * as storage from "./storage";
import { longlatsData } from "./longlatsData";

export const find = (location) => {
  return storage.find("longlats", "name", location);
};

//update seed data in localstorage
storage.load("longlats", longlatsData);
