import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const saved = localStorage.getItem('currentUser');
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch (e) {
          localStorage.removeItem('currentUser');
        }
      }
    }, []);

    const login_user = (userData) => {
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
    };

    const logout = () => {
      localStorage.removeItem('currentUser');
      setUser(null);
      navigate('/');
    };

    return (
      <AuthContext.Provider value={{ user, login_user, logout }}>
        {children}
      </AuthContext.Provider>
    );
};