function get(table) {
  let data = [];
  data = JSON.parse(localStorage.getItem(table) || "[]");
  return data;
}
function set(table, data) {
  localStorage.setItem(table, JSON.stringify(data));
}
export const add = (table, data) => {
  const existingData = get(table);
  if (!data.id) {
    data.id = `${Date.now()}`;
  }
  const newData = [...existingData, data];
  set(table, newData);
};
export const remove = (table, id) => {
  const existingData = get(table);
  const newData = existingData.filter((item) => item.id === id);
  set(table, newData);
};
export const update = (table, id, data) => {
  const existingData = get(table);
  const indexToUpdate = existingData.indexOf((item) => item.id === id);
  if (indexToUpdate !== -1) {
    const oldObj = existingData[indexToUpdate];
    const newObj = { ...oldObj, ...data, id: id };
    const newData = [
      ...existingData.slice(0, indexToUpdate),
      newObj,
      ...existingData.slice(indexToUpdate + 1)
    ];
    set(table, newData);
  }
};

export const read = (table, id) => {
  return get(table).find((item) => item.id === id);
};

export const readAll = (table) => {
  return get(table);
};

export const find = (table, field, value) => {
  return get(table).find((item) => item[field] === value);
};

export const query = (table, searchData) => {
  console.log(searchData);
  const filterFn = (item) => {
    return Object.keys(searchData).every((key) =>
      item[key].includes(searchData[key])
    );
  };
  return get(table).filter(filterFn);
};

export const load = (table, data) => {
  set(table, data);
};
