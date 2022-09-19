import _ from 'lodash';
import convertData from './convertData';
import countTimeInDay from './convertTimeInMonth';

const normalizeData = (data, currentDays) => {
  const normalize = data.map((item) => {
    const { id, Fullname, Days } = item;
    const daysWithout = _.differenceBy(currentDays, Days, 'Date').map((elem) => ({
      actualDay: convertData(elem),
      actualTime: '0',
    }));
    const daysWith = Days.map((item) => ({
      actualDay: convertData(item),
      actualTime: countTimeInDay(item),
    }));
    const concatedAndSortedAllDays = daysWithout
      .concat(daysWith)
      .sort((a, b) => a.actualDay - b.actualDay);
    const allTime = concatedAndSortedAllDays.reduce((acc, item) => {
      const time = item.actualTime;
      if (time !== '0') {
        const [hour, minute] = time.split(':');
        acc += Number(hour) * 60 + Number(minute);
      }
      return acc;
    }, 0);
    const allHours = Math.ceil(allTime / 60);
    return {
      id,
      Fullname,
      workDays: concatedAndSortedAllDays,
      allTime: `${allHours}: ${allHours * 60 - allTime}`,
    };
  });
  return normalize;
};

export default normalizeData;
