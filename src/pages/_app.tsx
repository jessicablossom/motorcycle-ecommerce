import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReservationProvider } from '../contextAPI/reservationContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ReservationProvider>
			<Component {...pageProps} />
		</ReservationProvider>
	);
};

export default App;
