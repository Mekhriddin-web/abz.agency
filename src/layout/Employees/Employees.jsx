import React from 'react';
import EmployeeList from '../../components/Employees/EmployeeList';

const Employees = () => {
  return (
    <section className="employees" id="employees">
      <div className="container">
        <h2 className="employees__title">Working with GET request</h2>
        <EmployeeList />
      </div>
    </section>
  );
};

export default Employees;
