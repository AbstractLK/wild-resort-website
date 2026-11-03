"use client";

import { createContext, useState, useContext } from "react";

const ReservationContext = createContext();
const initialState = { from: undefined, to: undefined };

const ReservationProvider = ({ children }) => {
  const [range, setRange] = useState(initialState);

  const resetRange = () => {
    setRange(initialState);
  };

  const handleSetRange = (selectedRange) => {
    setRange(selectedRange || initialState);
  };

  return (
    <ReservationContext.Provider value={{ range: range || initialState, setRange: handleSetRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === null) {
    throw new Error("context was used outside provider");
  }

  return context;
};

export { ReservationProvider, useReservation };
