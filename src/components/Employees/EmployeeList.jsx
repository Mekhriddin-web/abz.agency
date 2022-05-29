import React, { useContext, useEffect } from 'react';
import { getUsers } from '../../api';
import { UserContext } from '../../store';
import { setTotalPages, setUsers, showMoreUsers } from '../../store/action';
import Preloader from '../Preloader';
import EmployeeItem from './EmployeeItem';

const EmployeeList = () => {
  const {
    state: { users, totalPages, page },
    dispatch,
  } = useContext(UserContext);

  useEffect(() => {
    getUsers(page)
      .then(data => {
        if (data.success) {
          dispatch(setUsers(data.users));
          dispatch(setTotalPages(data.total_pages));
        } else {
          throw new Error();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [dispatch, page]);

  return users.length > 0 ? (
    <>
      <ul className="employees__list">
        {users.map(user => (
          <EmployeeItem key={user.id} {...user} />
        ))}
      </ul>
      {totalPages > page && (
        <button
          className="btn btn-long btn-center offset-top-first"
          onClick={() => dispatch(showMoreUsers(page))}
        >
          Show more
        </button>
      )}
    </>
  ) : (
    <Preloader />
  );
};

export default EmployeeList;
