import React, { useRef, useState, useEffect } from 'react';

import { Form, FormControl, Table } from "react-bootstrap";
import Pagination from './Pagination';
import normalizeData from './utils/normalizeData';
import convertData from './utils/convertData';
import createActualDaysInMonth from './utils/createActualDaysInMonth';

export const TableWithUsersData = ({ allData }) => {
  const fullNameRef = useRef();
  const startSlice = 0;
  const endSlice = 20;
  const stepPagination = 20;
  const dateForTable = allData[0].Days;
  const date = createActualDaysInMonth(dateForTable);
  const normalizeUsersData = normalizeData(allData, date);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedData, setSearchedData] = useState(normalizeUsersData.slice(startSlice, endSlice));
  const [pages, setPages] = useState(Math.ceil(normalizeUsersData.length / stepPagination));
  const painationClickHandler = (page) => {
    setCurrentPage(page);
    setSearchedData(normalizeUsersData.slice(stepPagination * (page - 1), stepPagination * page));
  }
  useEffect(() => {
  }, [setCurrentPage, currentPage, searchedData]);

  const searchHandler = (data, string='') => {
    if (string === '') {
      setPages(Math.ceil(data.length / stepPagination));
      setSearchedData(data.slice(startSlice, endSlice));
    } else {
      const searchedData = data.filter((item) => item.Fullname.includes(string));
      setSearchedData(searchedData.slice(startSlice, endSlice));
      setPages(Math.ceil(searchedData.length / stepPagination));
    }
  }
  
  return (
    <>
      <Form className='w-25 ml-5 mt-5'>
        <FormControl type='text' ref={fullNameRef} onChange={(e) => searchHandler(normalizeUsersData, e.target.value)}/>
      </Form>
      <Table size='xs' className='text-center' striped bordered>
        <thead>
          <tr>
            <td className='sticky-position'>User</td>
              {
                date.map((day, index) => <td
                  key={index}
                  id={convertData(day)}
                >{convertData(day)}</td>)
              }
            <td className='sticky-position'>Total</td>
            </tr>
          </thead>
          <tbody className='table-scroll'>
            { searchedData.map((user) => {
              const { Fullname, workDays, allTime } = user;
              return <tr>
                <td className='sticky-position'>{Fullname}</td>
                  {
                    workDays.map((day) => <td key={day.actualDay} className='centered'>{day.actualTime}</td>)
                  }
                <td className='sticky-position'>{allTime}</td>
                </tr>
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={33}>
              <Pagination pages={pages} currentPage={currentPage} painationClickHandler={painationClickHandler}/>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  )
}
