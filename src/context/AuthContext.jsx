import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('veritex_users') || '[]');
    const demoUser = {
      id: 'demo-testing-user',
      name: 'Testing Admin',
      email: 'testing@veritex.com',
      password: 'Testing123',
      role: 'admin',
      joined: new Date().toISOString(),
    };

    const existingDemoIndex = users.findIndex(u => u.email?.toLowerCase() === demoUser.email);

    if (existingDemoIndex === -1) {
      users.push(demoUser);
    } else {
      users[existingDemoIndex] = {
        ...users[existingDemoIndex],
        role: 'admin',
      };
    }

    localStorage.setItem('veritex_users', JSON.stringify(users));

    const saved = localStorage.getItem('veritex_user');
    if (saved) {
      const safeUser = JSON.parse(saved);
      setUser({ ...safeUser, role: safeUser.role || 'user' });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('veritex_users') || '[]');
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find(u => u.email?.toLowerCase() === normalizedEmail && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      const withRole = { ...safeUser, role: safeUser.role || 'user' };
      setUser(withRole);
      localStorage.setItem('veritex_user', JSON.stringify(withRole));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('veritex_users') || '[]');
    const normalizedEmail = email.trim().toLowerCase();
    if (users.find(u => u.email?.toLowerCase() === normalizedEmail)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = {
      id: Date.now(),
      name,
      email: normalizedEmail,
      password,
      role: 'user',
      joined: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem('veritex_users', JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('veritex_user', JSON.stringify(safeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('veritex_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
