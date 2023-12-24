export function toWeekdayStr(day: number | Date): string {
  const cnt = day instanceof Date ? day.getDay() : day;
  if (cnt === 0) return "Chủ nhật";
  let res = "Thứ ";
  switch (cnt) {
    case 1:
      res += "hai";
      break;
    case 2:
      res += "ba";
      break;
    case 3:
      res += "tư";
      break;
    case 4:
      res += "năm";
      break;
    case 5:
      res += "sáu";
      break;
    case 6:
      res += "bảy";
      break;
    default:
      return "Không biết";
  }
  return res;
}

export function formatAMPM(date: Date | null): string {
  if (!date) return "";
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  var strTime =
    hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
  return strTime;
}
