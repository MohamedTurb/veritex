import { createContext, useContext, useState, useEffect } from 'react';

const NewsletterContext = createContext();

export function NewsletterProvider({ children }) {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('veritex_newsletter') || '[]');
      if (Array.isArray(saved)) setEmails(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('veritex_newsletter', JSON.stringify(emails));
    } catch (e) {}
  }, [emails]);

  const subscribe = (email) => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return false;
    if (emails.includes(email)) return false;
    setEmails([...emails, email]);
    return true;
  };

  const unsubscribe = (email) => {
    setEmails(emails.filter(e => e !== email));
  };

  return (
    <NewsletterContext.Provider value={{ emails, subscribe, unsubscribe }}>
      {children}
    </NewsletterContext.Provider>
  );
}

export const useNewsletter = () => {
  const ctx = useContext(NewsletterContext);
  if (!ctx) throw new Error('useNewsletter must be used within NewsletterProvider');
  return ctx;
};
