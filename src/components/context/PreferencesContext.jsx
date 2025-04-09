import { createContext, useState, useContext, useEffect, useCallback } from 'react';

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({});
  const [allTags, setAllTags] = useState([]);
  
  useEffect(() => {
    if (!Array.isArray(allTags) || allTags.length === 0) return;
    const initialPrefs = {};
    allTags.forEach(tag => {
      initialPrefs[tag] = preferences[tag] !== undefined ? preferences[tag] : true;
    });
    setPreferences(initialPrefs);
  }, [allTags]);

  const updatePreferences = useCallback((tag, value) => {
    
    setPreferences(prev => ({
      ...prev,
      [tag]: value
    }));
  }, []);

  const updateAllTags = useCallback((tags) => {
    const validTags = tags.filter(tag => typeof tag === 'string' && tag.trim() !== '');
    setAllTags(validTags);
  }, []);

  return (
    <PreferencesContext.Provider value={{ 
      preferences, 
      updatePreferences, 
      allTags,
      updateAllTags
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext); 