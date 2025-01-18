import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  notification: null,
  setNotification: () => {}
});

export const ContextProvider = ({children}) => {

  const [user, setUser] = useState({
    name: '',
    email: ''
  });
  const [notification, _setNotification] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const setToken = (token) => {
    _setToken(token);
    if(token){
      localStorage.setItem('ACCESS_TOKEN', token);
    }else{
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const setNotification = (message) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification(null);
    }, 3000);
  }

  return (
    <StateContext.Provider
      value={
        {
          user,
          setUser,
          token,
          setToken,
          notification,
          setNotification
        }
      }
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
