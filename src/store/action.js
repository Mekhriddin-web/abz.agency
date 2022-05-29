import {
  SET_USERS,
  SET_TOTAL_PAGES,
  FORM_SENT,
  SHOW_MORE_USERS,
} from './types';

export const setUsers = users => ({
  type: SET_USERS,
  payload: users,
});

export const setTotalPages = totalPages => ({
  type: SET_TOTAL_PAGES,
  payload: totalPages,
});

export const submitForm = () => ({
  type: FORM_SENT,
});

export const showMoreUsers = page => ({
  type: SHOW_MORE_USERS,
  payload: page,
});
