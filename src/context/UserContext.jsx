import react, { createContext, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';
import { ApplicationContext, statusCode } from './ApplicationContext';

const initialState = {
  user: {
    token: '',
  },
  loading: false,
  error: '',
};

export const tokenKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9token';


export const userActions = {
  SET_USER_TOKEN: 'SET_USER_TOKEN',
  SET_USER_ERROR: 'SET_USER_ERROR',
  REMOVE_USER_TOKEN: 'REMOVE_USER_TOKEN',
  SET_LOADING: 'SET_LOADING',
};

const reducer = (state, action) => {
  switch (action.type) {
    case userActions.SET_USER_TOKEN:
      return {
        ...state,
        user: {
          ...state.user,
          token: action.payload,
        },
      };
    case userActions.SET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case userActions.REMOVE_USER_TOKEN:
      return {
        ...state,
        user: {
          token: '',
        },
      };

    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // TODO: Change auth to be cookie based
  const [state, dispatch] = useReducer(reducer, initialState);
  const {setStatus, clearLoading, setLoading} = useContext(ApplicationContext);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
      const data = await handler({fn:login, param: { email, password }, out: true})
      if(data?.token){
        localStorage.setItem(tokenKey, data.token);
        dispatch({type: userActions.SET_USER_TOKEN, payload: data.token});
        navigate('/dashboard');
      }
  
  };

  const logoutUser = () => {
    localStorage.removeItem(tokenKey);
    dispatch({ type: userActions.REMOVE_USER_TOKEN });
    navigate('/login');
  }

  const handler = async ({fn, param, out=false, show=true}) => {
    setLoading();
    try {
      const {data} = await fn(param);
      if(show) setStatus(statusCode.SUCCESS, data?.msg);

      if(out) {
        return data;
      }

    } catch(e) {
      let error = e?.response?.data;
      if(error?.code == 'sessionExpired'){
        logoutUser();
      }
      setStatus(statusCode.ERROR, error?.msg)
    } finally {
      clearLoading();
    }
  }

  const getToken = async () => {
    const token = localStorage.getItem(tokenKey);

    if(token) {
      try {
        dispatch({type:userActions.SET_USER_TOKEN, payload:token});
      } catch (e) {
        logoutUser();
        setStatus(statusCode.ERROR, e?.response?.data?.msg);
      }
    }
  }

  return <UserContext.Provider value={{ ...state, loginUser, logoutUser, getToken, handler }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;