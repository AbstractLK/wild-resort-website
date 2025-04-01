"use client";

import { createContext, useState, useContext } from "react";

const ReservationContext = createContext();
const initialState = { from: null, to: null };

const ReservationProvider = ({ children }) => {
  const [range, setRange] = useState(initialState);
  const resetRange = () => {
    setRange(initialState);
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
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
