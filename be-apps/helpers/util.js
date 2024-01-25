exports.randomOrderNumber = () => {
  const prefix = "T",
    randomNumber = Math.floor(Math.random() * 1000000);
  return prefix + randomNumber;
};
