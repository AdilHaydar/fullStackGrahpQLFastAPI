import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BottomNavbar from "@/components/BottomNavbar";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
        <BottomNavbar />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
