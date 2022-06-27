export const createCategory = (list) => [
  ...new Set(list.map((ele) => ele.category)),
];
