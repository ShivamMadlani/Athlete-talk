import Head from "next/head";
import { AuthContextProvider } from "../authCtx";
import "./globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Head>
        <title>Athlete Talk</title>
        <link rel="icon" type="image/x-icon" href="/logo.jpg" />
      </Head>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
