import COLORS from "../consts/colors";

export const randomId = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

export const ArrayFrom = (to: number) => {
  return Array.from(Array(to).keys());
};

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // set to true if you want 12-hour format instead of 24-hour format
  };
  return date.toLocaleString("en-GB", options);
}

export const getColor = (type: "error" | "warn" | "success" | "info" | "primary") => {
  switch (type) {
    case "error":
      return "#FF0032";
    case "info":
      return "#ABC9FF";
    case "warn":
      return "#FCFF82";
    case "success":
      return "#B6FFCE";
    case "primary":
      return COLORS.primary;
    default:
      return COLORS.primary;
  }
};

export function convertPhone84(phoneNumber: string) {
  phoneNumber = phoneNumber.replace(/\D/g, ""); // Remove all non-numeric characters
  if (phoneNumber.length === 10) {
    phoneNumber = "+84" + phoneNumber.substr(1); // Prepend the country code and remove the leading "0"
  } else if (phoneNumber.length === 11) {
    phoneNumber = "+84" + phoneNumber.substr(2); // Prepend the country code and remove the leading "0"
  }
  return phoneNumber;
}
