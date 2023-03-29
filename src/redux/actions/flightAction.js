export const ValueChanged = (key, value) => {
  return {
    type: "VALUE_CHANGED",
    key,
    value,
  };
};
