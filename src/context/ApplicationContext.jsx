import react, { useReducer, createContext } from 'react';
import UserContextProvider from './UserContext';

const initialState = {
  status: {
    code: '',
    msg: '',
  },
  lease: 5000
};

export const appActions = {
  SET_STATUS: 'SET_STATUS',
  CLEAR_STATUS: 'CLEAR_STATUS',
};

export const statusCode = {
  SUCCESS: 'success',
  ERROR: 'error'
}


const reducer = (state, action) => {
  switch (action.type) {
    case appActions.SET_STATUS:
      return {
        ...state,
        status: {
          code: action.payload?.code,
          msg: action.payload.msg,
        },
      };

    case appActions.CLEAR_STATUS:
      return {
        ...state,
        status: {
          code: '',
          msg: '',
        },
      };

    default:
      return state;
  }
};

export const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setStatus = (code, msg) => {
    dispatch({type: appActions.SET_STATUS, payload: {code, msg}})
  }

  const clearStatus = () => {
    dispatch({type: appActions.CLEAR_STATUS})
  }

  return (
    <ApplicationContext.Provider value={{ ...state, setStatus, clearStatus}}>
      <UserContextProvider>{children}</UserContextProvider>
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;