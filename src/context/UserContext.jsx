import react, { createContext, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';
import { ApplicationContext, statusCode} from './ApplicationContext';

const initialState = {
  user: {
    token: '',
  },
  loading: false,
  error: '',
};


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
  const [state, dispatch] = useReducer(reducer, initialState);
  const {setStatus} = useContext(ApplicationContext);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const {data} = await login({ email, password });
      localStorage.setItem('token', data.token);
      setStatus(statusCode.SUCCESS, data.msg);
      dispatch({type: userActions.SET_USER_TOKEN, payload: data.token});
      navigate('/dashboard');
    } catch (e) {
      setStatus(statusCode.ERROR, e?.response?.data?.msg)
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch({ type: userActions.REMOVE_USER_TOKEN });
    navigate('/login');
  }

  const getToken = async () => {
    const token = localStorage.getItem('token');

    if(token) {
      try {
        dispatch({type:userActions.SET_USER_TOKEN, payload:token});
      } catch (e) {
        logoutUser();
        setStatus(statusCode.ERROR, e?.response?.data?.msg);
      }
    }
  }

  return <UserContext.Provider value={{ ...state, loginUser, logoutUser, getToken }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;