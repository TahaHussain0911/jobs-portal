import { createContext, useContext, useState } from "react";

const ResetPassContext = createContext(null);

export const ResetPassState = ({ children }) => {
  const [contextPayload, setContextPayload] = useState(null);
  return (
    <ResetPassContext.Provider value={{ contextPayload, setContextPayload }}>
      {children}
    </ResetPassContext.Provider>
  );
};
export const useResetPass = () => useContext(ResetPassContext);
