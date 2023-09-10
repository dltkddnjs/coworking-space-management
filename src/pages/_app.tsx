import type { AppProps } from 'next/app';
import '../styles/globals.css';
import PaginationProvider from 'context/PaginationProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PaginationProvider>
      <Component {...pageProps} />
    </PaginationProvider>
  );
}
