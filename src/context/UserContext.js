import react, { createContext, useReducer } from 'react';
import { login } from '../api/user';

const initialState = {
  user: {
    token: ''
  },
  loading: false,
  error: ''
}

export const userActions = {
  SET_USER_TOKEN: 'SET_USER_TOKEN',
  SET_USER_ERROR: 'SET_USER_ERROR',
  REMOVE_USER_TOKEN: 'REMOVE_USER_TOKEN',
  SET_LOADING: 'SET_LOADING',
};


export const userReducer = (state, action) => {
  switch(action.type) {
    case userActions.SET_USER_TOKEN:
      return {
        ...state,
        user : {
          ...state.user,
          token: action.payload
        }
      };
    case userActions.SET_USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case userActions.REMOVE_USER_TOKEN: 
      return {
        ...state,
        user: {
          token: ''
        }
      };
  }
}

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  //TODO: API call and action dispatch

  return (
    <UserContext.Provider value={...state}>
      {children}
    </UserContext.Provider>
  )
} 

export default UserContextProvider;