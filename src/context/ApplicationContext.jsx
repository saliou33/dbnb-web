import react, { useReducer, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContextProvider from './UserContext';

const initialState = {
  status: {
    code: '',
    msg: '',
  },
  lease: 5000,
  loading: false
};

export const appActions = {
  SET_STATUS: 'SET_STATUS',
  CLEAR_STATUS: 'CLEAR_STATUS',
  SET_LOADING: 'SET_LOADING',
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
    case appActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }

    case appActions.CLEAR_LOADING:
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state;
  }
};

export const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const setStatus = (code, msg) => {
    dispatch({type: appActions.SET_STATUS, payload: {code, msg}})
  }

  const clearStatus = () => {
    dispatch({type: appActions.CLEAR_STATUS})
  }

  const setLoading = () => {
    dispatch({type: appActions.SET_LOADING, payload: true})
  }

  const clearLoading = () => {
    dispatch({type: appActions.CLEAR_LOADING, payload: false})
  }




  return (
    <ApplicationContext.Provider value={{
       ...state, 
       setStatus, 
       clearStatus, 
       setLoading,
       clearLoading 
    }}>
      <UserContextProvider>{children}</UserContextProvider>
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;