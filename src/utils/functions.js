export function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

/**
 * Convert given Date object to Sri Lanka date format string (dd/mm/yyyy)
 */
export function convertTZ(date) {
  if (!date) {
    return "";
  } 
  let dateObj = new Date(date);
  // MM-DD-YYYY format
  let dateStr = dateObj.toLocaleDateString("ko-KR", {
    timeZone: "Asia/Colombo",
  });
  // Convert ot YYYY-MM-DD format
  let dateArr = dateStr.split(".");
  let year = dateArr[0].trim();
  let month = dateArr[1].trim();
  let day = dateArr[2].trim();


  // eslint-disable-next-line
  year.length === 2 ? (year = "00" + year) : year;
  // eslint-disable-next-line
  year.length === 3 ? (year = "0" + year) : year;
  // eslint-disable-next-line
  month.length === 1 ? (month = "0" + month) : month;
  // eslint-disable-next-line
  day.length === 1 ? (day = "0" + day) : day;

  const final = `${year}-${month}-${day}`;

  return final ? final : "";
}

/**
 * Convert given Date object to Sri Lanka date format string (dd/mm/yyyy)
 */
export function convertTZWithTime(date) {
  if (!date) {
    return "";
  } 
  let dateObj = new Date(date);
  let dateStr = dateObj.toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
  });
  console.log(dateStr);
  return dateStr;
}
