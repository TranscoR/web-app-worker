import { DAYS_NAMES, MONTH_NAMES } from "@/mocks/calendar";

const getLabelDate = (date: any) => {
  const current_date = new Date(date);
  const day = current_date.getDate();
  const month = current_date.getMonth();
  return `${day} ${MONTH_NAMES[month]}`;
};

// @ts-ignore
Date.prototype.addDays = function (days: any) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const getDates = (startDate: any, stopDate: any) => {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
};

export const getPaySlip = (start_date: any, end_date: any) => {
  let from = new Date(start_date);
  let to = new Date(end_date);
  let days = [];

  let d = from;
  while (d <= to) {
    days.push(DAYS_NAMES[d.getDay()]);
    d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
  }

  const days_dates = getDates(start_date, end_date);

  let days_array = days.map((day: any, i: any) => {
    return {
      day: i + 1,
      label_day: day,
      date: days_dates[i],
      label_date: getLabelDate(days_dates[i]),
      paid: false,
    };
  });

  return {
    start_week: getLabelDate(days_dates[0]),
    end_week: getLabelDate(days_dates[days_dates.length - 1]),
    payment_completed: false,
    days: [...days_array],
  };
};

export const renderDateFirebase = (value_date: any) => {
  if (value_date) {
    // @ts-ignore
    const date = new window.Date(
      value_date.seconds * 1000 + value_date.nanoseconds / 1000000
    );
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${day} ${MONTH_NAMES[month]}`;
  }
};
