const countTimeInDay = (date) => {
  const { End, Start, Date: dateIn } = date;
  const milisecondsInMinute = 60000;
  const minuteInHour = 60;
  const [startHours, startMinutes] = Start.split('-');
  const startTime = new Date(dateIn).setHours(startHours, startMinutes);
  const [endHours, endMinutes] = End.split('-');
  const endTime = new Date(dateIn).setHours(endHours, endMinutes);
  const result = (endTime - startTime) / milisecondsInMinute;
  const hours = Math.round(result / minuteInHour);
  const minutes = Math.abs(result - hours * minuteInHour);
  return `${hours}:${minutes}`;
};

export default countTimeInDay;
