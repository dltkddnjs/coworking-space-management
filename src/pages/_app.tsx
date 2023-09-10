import type { AppProps } from 'next/app';
import PaginationProvider from 'context/PaginationProvider';
import withTheme from '../../theme';
import '../styles/globals.css';
import '../../public/antd.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return withTheme(
    <PaginationProvider>
      <Component {...pageProps} />
    </PaginationProvider>,
  );
}
