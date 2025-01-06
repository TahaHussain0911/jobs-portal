const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const renderCurrency = (currency, price) => {
  switch (currency) {
    case "PKR":
      return `${numberWithCommas(price)} ${currency}`;
    case "$":
      return `${currency} ${numberWithCommas(price)}`;
    default:
      return `${currency} ${numberWithCommas(price)}`;
  }
};
export { renderCurrency, numberWithCommas };
