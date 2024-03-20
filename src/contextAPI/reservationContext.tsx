import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, ReservationContextType } from '../utils/types';

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

const useReservation = () => {
	const context = useContext(ReservationContext);
	if (!context) {
		throw new Error('useReservation must be used within a ReservationProvider');
	}
	return context;
};

const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [reservation, setReservation] = useState<Order>();
	const addToReservation = (order) => {
		let merged = { ...reservation, ...order };
		setReservation(merged);
	};

	return (
		<ReservationContext.Provider value={{ reservation, addToReservation }}>{children}</ReservationContext.Provider>
	);
};
export { useReservation, ReservationProvider };
