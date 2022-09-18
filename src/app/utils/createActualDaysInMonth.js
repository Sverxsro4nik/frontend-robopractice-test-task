const createActualDaysInMonth = (date) => {
  const month = new Date(date[0].Date).getMonth();
  const year = new Date(date[0].Date).getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const actyalDate = [];
  for(let day = 1; day <= daysInMonth; day += 1) {
    const currentDate = new Date(year, month, day).toLocaleDateString().split('.');
    const [currentDay, currentMonth, currentYear] = currentDate;
    actyalDate.push({Date: `${currentYear}-${currentMonth}-${currentDay}`});
  }
  return actyalDate;
}

export default createActualDaysInMonth;