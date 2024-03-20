import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReservationProvider } from '../contextAPI/reservationContext';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ReservationProvider>
			<Component {...pageProps} />
		</ReservationProvider>
	);
}
