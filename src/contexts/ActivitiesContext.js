import { useState } from 'react';
import { createContext } from 'react';

const ActivitiesContext = createContext();
export default ActivitiesContext;

export function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState(null);

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
}
