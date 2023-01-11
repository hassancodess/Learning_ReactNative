import React, {useState, createContext} from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
  const IP = '192.168.100.80';
  const [userInfo, setUserInfo] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const login = async (email, password) => {
    const response = await fetch(
      `http://${IP}/ProductsAPI/api/users/login?email=${email}&password=${password}`,
    );

    if (response.status === 200) {
      const data = await response.json();
      setIsAuth(true);
      setUserInfo(data);
    } else {
      setIsAuth(false);
      setUserInfo({});
    }
  };
  const createAccount = async (name, email, age, password) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        age: age,
        password: password,
      }),
    };
    const response = await fetch(
      `http://${IP}/ProductsAPI/api/users/createAccount`,
      options,
    );
    if (response.status === 200) {
      return true;
    } else {
      false;
    }
  };
  const logout = () => {
    setIsAuth(false);
    setUserInfo(null);
  };
  const values = {
    userInfo,
    setUserInfo,
    isAuth,
    setIsAuth,
    login,
    logout,
    createAccount,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthContext;
