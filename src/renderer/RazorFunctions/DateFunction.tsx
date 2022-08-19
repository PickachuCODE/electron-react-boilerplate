const initDate = new Date();
const weekday = new Array(
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
);
const months = new Array(
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
);
const dayOfWeek = weekday[initDate.getDay()];
let curMonth = months[initDate.getMonth()],
  curYear = initDate.getFullYear(),
  curHour =
    initDate.getHours() > 12
      ? initDate.getHours() - 12
      : initDate.getHours() < 10
      ? '0' + initDate.getHours()
      : initDate.getHours(),
  curMinute =
    initDate.getMinutes() < 10
      ? '0' + initDate.getMinutes()
      : initDate.getMinutes(),
  curSeconds =
    initDate.getSeconds() < 10
      ? '0' + initDate.getSeconds()
      : initDate.getSeconds(),
  curMeridiem = initDate.getHours() > 12 ? 'PM' : 'AM';



export var today:string | number =
  curHour +
  ':' +
  curMinute +
  '.' +
  curSeconds +
  " " +
  curMeridiem +
  ' ' +
  dayOfWeek +
  ' ' +
  curMonth +
  ', ' +
  curYear;

