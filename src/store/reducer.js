import {
  SET_TOTAL_PAGES,
  SET_USERS,
  FORM_SENT,
  SHOW_MORE_USERS,
} from './types';

export const initialUserState = {
  users: [],
  totalPages: 1,
  formSent: false,
  page: 1,
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case SHOW_MORE_USERS:
      return {
        ...state,
        page: state.page + 1,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    case FORM_SENT:
      return {
        ...state,
        formSent: true,
        page: 1,
      };
    default:
      return state;
  }
};
