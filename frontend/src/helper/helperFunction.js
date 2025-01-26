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
const appendRecursiveFormData = (key, value, formData, parentKey = "") => {
  // if value is an object
  if (typeof value === "object" && !Array.isArray(value)) {
    for (let innerKey in value) {
      appendRecursiveFormData(
        innerKey,
        value[innerKey],
        formData,
        `${parentKey}${key ? `[${key}]` : ""}`
      );
    }
  }
  // if value is an array
  else if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      appendRecursiveFormData(
        i,
        value[i],
        formData,
        `${parentKey}${key ? `[${key}]` : ""}`
      );
    }
  } else {
    formData.append(`${parentKey}${key ? [`${key}`] : ""}`, value);
  }
};
const CreateFormData = (payload) => {
  const formData = new FormData();
  for (let key in payload) {
    appendRecursiveFormData(key, payload[key], formData);
  }
  return formData;
};

export { renderCurrency, numberWithCommas, CreateFormData };
