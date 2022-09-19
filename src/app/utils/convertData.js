const convertData = (date) => {
  const { Date: mountDate } = date;
  return new Date(mountDate).getDate();
};
export default convertData;
