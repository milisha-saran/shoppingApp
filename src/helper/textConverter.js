export const textConverter = (name) =>
  name
    .split(" ")
    .filter((ele, i) => i < 3)
    .join(" ");
