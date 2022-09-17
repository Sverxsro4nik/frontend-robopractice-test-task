import React, { useState } from 'react';

import { Form, FormControl, Table } from "react-bootstrap";
import _ from 'lodash';

const convertData = (date) => {
    const { Date: mountDate } = date;
    return new Date(mountDate).getDate();
};

const countTimeInMonth = (date) => {
  const { End, Start, Date: dateIn } = date;
  const milisecondsInHour = 3600000;
  const [startHours, startMinutes] = Start.split('-'); 
  const startTime = new Date(dateIn).setHours(startHours, startMinutes);
  const [endHours, endMinutes] = End.split('-');
  const endTime = new Date(dateIn).setHours(endHours, endMinutes);
  const result = (endTime - startTime) / milisecondsInHour;
  return result.toFixed(2);
}

const normalizeData = (data, currentDays) => {
  const normalize = data.map((item) => {
    const { id, Fullname, Days } = item;
    const daysWithout =  _.differenceBy(currentDays, Days, 'Date')
      .map((elem) => ({
        actualDay: convertData(elem),
        actualTime: 0
      }));
    const daysWith = Days.map((item) => ({
      actualDay: convertData(item),
      actualTime: countTimeInMonth(item)
    }));
    const concatedAndSortedAllDays = daysWithout.concat(daysWith).sort((a, b) => a.actualDay - b.actualDay);
    const allTime = concatedAndSortedAllDays.reduce((acc, item) => {
      acc += Number(item.actualTime);
      return acc;
    }, 0)
    return {id, Fullname, workDays: concatedAndSortedAllDays, allTime: allTime.toFixed(2)}
  });
  return normalize;
}

export const TableWithUsersData = ({ allData }) => {
  const [limit, setLimit] = useState(0);
  const dateForTable = allData[0].Days;
  const stepPagination = 20;
  const listUserData = allData.slice(limit, stepPagination);
  const result = normalizeData(listUserData, dateForTable);
  return (
    <>
      <Form className='w-25 ml-5 mt-5'>
        <FormControl type='text' />
      </Form>
      <Table responsive size='xs' className='text-center'>
        <thead>
          <tr>
            <td className='fixed'>User</td>
              {
                dateForTable.map((day, index) => <td key={index}>{convertData(day)}</td>)
              }
            <td className='fixed'>Total</td>
            </tr>
          </thead>
          <tbody>
            { result.map((user) => {
              const { Fullname, workDays, allTime } = user;
              return <tr>
                <td className='fixed'>{Fullname}</td>
                  {
                    workDays.map((day) => <td key={day.actualDay} className='centered'>{day.actualTime}</td>)
                  }
                <td>{allTime}</td>
                </tr>
            })
          }
        </tbody>
      </Table>
    </>
  )
}
